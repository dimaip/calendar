import {assert} from 'chai';
import verseParse from './verseParse.js';

describe('Verse parser', () => {
  it('Деян., 2 зач., I, 12 - 17', () => {
    const v = 'Деян., 2 зач., I, 12 - 17';
    const actual = verseParse(v);
    const expected = {
      bookKey: 'Acts',
      segments: {
        1: [
          [12, 17]
        ]
      }
    };
    assert.deepEqual(actual, expected);
  });
  it('Деян., 2 зач., I, 12 - 17, 21-26.', () => {
    const v = 'Деян., 2 зач., I, 12 - 17, 21-26.';
    const actual = verseParse(v);
    const expected = {
      bookKey: 'Acts',
      segments: {
        1: [
          [12, 17],
          [21, 26]
        ]
      }
    };
    assert.deepEqual(actual, expected);
  });
  it('Деян., 17 зач., VI, 8 - VII, 5; 47-60.', () => {
    const v = 'Деян., 17 зач., VI, 8 - VII, 5; 47-60.';
    const actual = verseParse(v);
    const expected = {
      bookKey: 'Acts',
      segments: {
        6: [
          [8, null]
        ],
        7: [
          [1, 5],
          [47, 60]
        ]
      }
    };
    assert.deepEqual(actual, expected);
  });
  it('1 Петр., 58 зач., I, 1-2, 10-12; II, 6-10.', () => {
    const v = '1 Петр., 58 зач., I, 1-2, 10-12; II, 6-10.';
    const actual = verseParse(v);
    const expected = {
      bookKey: '1Peter',
      segments: {
        1: [
          [1, 2],
          [10, 12]
        ],
        2: [
          [6, 10]
        ]
      }
    };
    assert.deepEqual(actual, expected);
  });
  it('Тит., 300 зач., I, 1-4; II, 15 - III, 3, 12-13, 15.', () => {
    const v = 'Тит., 300 зач., I, 1-4; II, 15 - III, 3, 12-13, 15.';
    const actual = verseParse(v);
    const expected = {
      bookKey: 'Titus',
      segments: {
        1: [
          [1, 4]
        ],
        2: [
          [15, null]
        ],
        3: [
          [1, 3],
          [12, 13],
          [15, 15]
        ]
      }
    };
    assert.deepEqual(actual, expected);
  });
  it('Евр., 329 зач. (от полу́), XI, 24-26, 32 - XII, 2.', () => {
    const v = 'Евр., 329 зач. (от полу́), XI, 24-26, 32 - XII, 2.';
    const actual = verseParse(v);
    const expected = {
      bookKey: 'Hebrews',
      segments: {
        11: [
          [24, 26],
          [32, null]
        ],
        12: [
          [1, 2]
        ]
      }
    };
    assert.deepEqual(actual, expected);
  });
});
