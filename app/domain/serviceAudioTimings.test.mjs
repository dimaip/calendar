import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';

import { serviceTextTokens, findSpokenWord } from './serviceAudioTimings.ts';

test('spoken tokens preserve accented DOM offsets and skip unspoken rubrics', () => {
    const text = 'Припев По́милуй меня (трижды), святой Боже, ещё!';
    const tokens = serviceTextTokens(text);
    assert.deepEqual(
        tokens.map((token) => token.value),
        ['помилуй', 'меня', 'святой', 'боже', 'еще']
    );
    assert.deepEqual(
        tokens.map((token) => text.slice(token.start, token.end)),
        ['По́милуй', 'меня', 'святой', 'Боже', 'ещё']
    );
});

test('audio lookup follows actual timestamps, seeking backwards and leaving silence unhighlighted', () => {
    const words = [
        { start: 1, end: 1.4 },
        { start: 2, end: 2.5 },
        { start: 4, end: 4.5 },
    ];
    assert.equal(findSpokenWord(words, 0), null);
    assert.equal(findSpokenWord(words, 2.2), words[1]);
    assert.equal(findSpokenWord(words, 1.2), words[0]);
    assert.equal(findSpokenWord(words, 3), null);
    assert.equal(findSpokenWord(words, 99), null);
    assert.equal(findSpokenWord([], 0), null);
});

test('published timings match the text and retain omissions rather than inventing positions', () => {
    for (const service of ['pokajanni', 'chinPrigotovlenija']) {
        const data = JSON.parse(fs.readFileSync(new URL(`../data/serviceAudio/${service}.json`, import.meta.url)));
        assert.equal(data.serviceId, service);
        assert.equal(data.version, 2);
        let previousStart = -1;
        for (const block of data.blocks) {
            const tokens = serviceTextTokens(block.text);
            const seen = new Set();
            for (const word of block.words) {
                assert.ok(tokens[word.index], `${service}: invalid token ${word.index}`);
                assert.ok(!seen.has(word.index));
                seen.add(word.index);
                assert.ok(word.start >= previousStart, `${service}: non-monotonic word timing`);
                assert.ok(word.end > word.start);
                assert.ok(word.score >= 0.03);
                previousStart = word.start;
            }
        }
        if (service === 'chinPrigotovlenija') {
            assert.equal(data.blocks[0].words.length, 0);
            assert.ok(data.blocks.find((block) => block.words.length)?.text.startsWith('Приди́те, народы'));
        }
    }
});
