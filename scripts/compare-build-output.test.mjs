import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeShellRevisions } from './compare-build-output.mjs';

const worker = (revision) =>
    ['/', '/?utm_source=homescreen', '/?utm_source=homescreen&from_home', '/?utm_source=homescreen&from_twa']
        .map((url) => `{'revision':'${revision}','url':'${url}'}`)
        .join(',') + ",{'revision':'1','url':'/manifest.json'};activate();";

test('only random shell revisions are ignored in build comparisons', () => {
    assert.equal(normalizeShellRevisions(worker('first')), normalizeShellRevisions(worker('second')));
    assert.notEqual(
        normalizeShellRevisions(worker('first')),
        normalizeShellRevisions(worker('first').replace('activate()', 'unregister()'))
    );
    assert.notEqual(
        normalizeShellRevisions(worker('first')),
        normalizeShellRevisions(worker('first').replace("'revision':'1'", "'revision':'2'"))
    );
});
test('missing and duplicate shell variants are rejected', () => {
    assert.throws(() => normalizeShellRevisions(worker('a').replace('/?utm_source=homescreen&from_twa', '/missing')));
    assert.throws(() => normalizeShellRevisions(worker('a') + ",{'revision':'b','url':'/'}"));
});
