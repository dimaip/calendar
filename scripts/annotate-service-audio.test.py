import importlib.util
from pathlib import Path
import unittest


spec = importlib.util.spec_from_file_location("annotator", Path(__file__).with_name("annotate-service-audio.py"))
annotator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(annotator)


class AnnotationTests(unittest.TestCase):
    def reference(self, texts):
        return {
            "serviceId": "pokajanni",
            "language": "ru",
            "blocks": annotator.reference_blocks([{"text": text, "section": "Песнь 1"} for text in texts], "pokajanni"),
        }

    def transcript(self, texts):
        return {"word_segments": [
            {"word": text, "start": index, "end": index + 0.8}
            for index, text in enumerate(texts.split())
        ]}

    def test_stress_marks_and_punctuation_do_not_change_matching(self):
        reference = self.reference(["Приди́те, покло́нимся Царю нашему Богу!"])
        result = annotator.annotate(reference, self.transcript("Придите поклонимся Царю нашему Богу"))
        self.assertEqual(result["blocks"][0]["coverage"], 1)
        self.assertEqual(result["blocks"][0]["start"], 0)
        self.assertEqual(result["blocks"][0]["end"], 4.8)
        self.assertEqual(annotator.normalize("святой"), ["святой"])

    def test_missing_passages_are_not_given_invented_timestamps(self):
        reference = self.reference(["В начале было Слово", "Несуществующий пропущенный текст", "И Слово было у Бога"])
        result = annotator.annotate(reference, self.transcript("В начале было Слово И Слово было у Бога"))
        self.assertIsNone(result["blocks"][1]["start"])
        self.assertIn("insufficient-match", result["blocks"][1]["reviewReasons"])
        self.assertEqual(result["blocks"][2]["start"], 4)

    def test_repeated_refrains_keep_distinct_ids_and_require_review(self):
        reference = self.reference(["Господи помилуй", "Услышь нас", "Господи помилуй"])
        result = annotator.annotate(reference, self.transcript("Господи помилуй Услышь нас Господи помилуй"))
        self.assertEqual(len({block["id"] for block in result["blocks"]}), 3)
        self.assertEqual([block["start"] for block in result["blocks"]], [0, 2, 4])
        self.assertIn("repeated-passage", result["blocks"][2]["reviewReasons"])
        self.assertTrue(result["reviewRequired"])
        self.assertEqual(result["status"], "draft")

    def test_invalid_timestamps_and_segment_only_input_are_rejected(self):
        reference = self.reference(["Господи помилуй"])
        for timestamp in [-1, float("nan"), float("inf")]:
            with self.assertRaises(ValueError):
                annotator.annotate(reference, {"word_segments": [{"word": "Господи", "start": timestamp, "end": 1}]})
        with self.assertRaises(ValueError):
            annotator.annotate(reference, {"segments": [{"text": "Господи помилуй", "start": 0, "end": 1}]})

    def test_whisperx_and_faster_word_formats_are_supported(self):
        words = self.transcript("Господи помилуй")["word_segments"]
        a = annotator.annotate(self.reference(["Господи помилуй"]), {"word_segments": words})
        b = annotator.annotate(self.reference(["Господи помилуй"]), {"segments": [{"words": words}]})
        self.assertEqual(a, b)

    def test_recognized_extra_speech_is_retained_for_review(self):
        result = annotator.annotate(self.reference(["Господи помилуй"]), self.transcript("Вступление Господи помилуй"))
        self.assertEqual(result["blocks"][0]["start"], 1)
        self.assertEqual(result["unmatchedTranscriptWords"][0]["token"], "вступление")


if __name__ == "__main__":
    unittest.main()
