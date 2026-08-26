import assert from 'node:assert/strict';
import test from 'node:test';

import React from 'react';

import { getHeadingLabel, OMIT_FROM_HEADING_LABEL } from './headingLabel.ts';

const HiddenAnnotation = ({ children }) => children;
HiddenAnnotation[OMIT_FROM_HEADING_LABEL] = true;

test('builds a visible heading label from text and presentational markup', () => {
    const children = [
        React.createElement('b', { key: 'open' }, '['),
        ' Молитва ',
        React.createElement('br', { key: 'break' }),
        React.createElement('em', { key: 'detail' }, 'перед чтением'),
    ];

    assert.equal(getHeadingLabel(children), '[ Молитва перед чтением');
});

test('omits tooltip-style annotations from heading labels', () => {
    const children = [
        'Чтение Апостола ',
        React.createElement(HiddenAnnotation, { key: 'note' }, 'Длинное примечание для всплывающей подсказки'),
    ];

    assert.equal(getHeadingLabel(children), 'Чтение Апостола');
});
