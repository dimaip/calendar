import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('aligner', Path(__file__).with_name('align-service-words.py'))
aligner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(aligner)


class AlignmentTests(unittest.TestCase):
    def test_spelling_errors_and_merged_recognition_keep_monotonic_anchors(self):
        reference = 'начало помилуй меня боже конец'.split()
        spoken = 'начало помил имя боже конец'.split()
        mapping = aligner.match_words(reference, spoken)
        self.assertEqual(sorted(mapping.values()), list(mapping.values()))
        self.assertEqual(mapping[0], 0)
        self.assertEqual(mapping[4], 4)
        self.assertIn(1, mapping)

    def test_repeated_refrains_remain_in_reading_order(self):
        words = 'господи помилуй услышь нас господи помилуй'.split()
        self.assertEqual(aligner.match_words(words, words), dict(enumerate(range(len(words)))))

    def test_omitted_intro_has_no_acoustic_chunks(self):
        reference = {'blocks': [{'text': 'совершенно пропущенное вступление'}, {'text': 'придите народы воспоем песнь богу'}]}
        transcript = {'word_segments': [{'word': text, 'start': i, 'end': i + .8}
                                        for i, text in enumerate('придите народы воспоем песнь богу'.split())]}
        chunks = aligner.alignment_chunks(reference, transcript)
        self.assertEqual([chunk['block'] for chunk in chunks], [1])
        self.assertEqual(chunks[0]['leftContext'], 0)
        self.assertEqual(chunks[0]['coreLength'], 5)

    def test_conflicting_matches_drop_weaker_word_without_interpolating(self):
        a = {'start': 1, 'end': 2, 'score': .9}
        b = {'start': 1.5, 'end': 2.5, 'score': .3}
        c = {'start': 3, 'end': 4, 'score': .8}
        blocks = [{'words': [a, b]}, {'words': [c]}]
        aligner.remove_conflicting_words(blocks)
        self.assertEqual(blocks, [{'words': [a]}, {'words': [c]}])


if __name__ == '__main__':
    unittest.main()
