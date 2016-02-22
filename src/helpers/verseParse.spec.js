import {assert} from 'chai';
import verseParse from './verseParse.js';

describe('Verse parser', () => {
  it('Деян., 2 зач., I, 12 - 17', () => {
    const v = 'Деян., 2 зач., I, 12 - 17';
    const actual = verseParse(v);
    const expected = {
      bookKey: 'Деян',
      verseArray: [
        [[1, 12], [1, 17]]
      ]
    };
    assert.deepEqual(expected, actual);
  });
  it('Деян., 2 зач., I, 12 - 17, 21-26.', () => {
    const v = 'Деян., 2 зач., I, 12 - 17, 21-26.';
    const actual = verseParse(v);
    const expected = {
      bookKey: 'Деян',
      verseArray: [
        [[1, 12], [1, 17]],
        [[1, 21], [1, 26]]
      ]
    };
    assert.deepEqual(expected, actual);
  });
  it('Деян., 17 зач., VI, 8 - VII, 5; 47-60.', () => {
    const v = 'Деян., 17 зач., VI, 8 - VII, 5; 47-60.';
    const actual = verseParse(v);
    const expected = {
      bookKey: 'Деян',
      verseArray: [
        [[6, 8], [7, 5]],
        [[7, 47], [7, 60]]
      ]
    };
    assert.deepEqual(expected, actual);
  });
  it('1 Петр., 58 зач., I, 1-2, 10-12; II, 6-10.', () => {
    const v = '1 Петр., 58 зач., I, 1-2, 10-12; II, 6-10.';
    const actual = verseParse(v);
    const expected = {
      bookKey: '1 Петр',
      verseArray: [
        [[1, 1], [1, 2]],
        [[1, 10], [1, 12]],
        [[2, 6], [2, 10]]
      ]
    };
    assert.deepEqual(expected, actual);
  });
  it('Тит., 300 зач., I, 1-4; II, 15 - III, 3, 12-13, 15.', () => {
    const v = 'Тит., 300 зач., I, 1-4; II, 15 - III, 3, 12-13, 15.';
    const actual = verseParse(v);
    const expected = {
      bookKey: 'Тит',
      verseArray: [
        [[1, 1], [1, 4]],
        [[2, 15], [3, 3]],
        [[3, 12], [3, 13]],
        [[3, 15]]
      ]
    };
    assert.deepEqual(expected, actual);
  });
});
