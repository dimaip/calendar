import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = ts.transpileModule(readFileSync(new URL('./Main.tsx', import.meta.url), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
}).outputText;

function renderMain(services, banner) {
    const passthrough = ({ children }) => children ?? null;
    const mocks = {
        emotion: { css: () => '' },
        'emotion-theming': { ThemeProvider: passthrough },
        'react-router-dom': { useParams: () => ({ date: '2026-10-12' }), useHistory: () => ({}) },
        recoil: { useRecoilValue: () => null },
        'hooks/useDay': { default: () => ({ status: 'success', data: {} }) },
        'hooks/useExternalDay': { default: () => ({}) },
        'hooks/useBroadcastBanner': { default: () => ({ banner, now: 0 }) },
        'styles/getTheme': { default: () => ({}) },
        'react-swipeable-views-utils': {
            virtualize:
                () =>
                ({ slideRenderer }) =>
                    slideRenderer({ key: 'calendar', index: 0 }),
        },
        './Banner': { default: () => React.createElement('aside', null, 'Broadcast banner') },
        './Services': { default: () => React.createElement('section', null, 'Services list') },
    };
    const module = { exports: {} };
    vm.runInNewContext(source, {
        module,
        exports: module.exports,
        require(name) {
            if (name === 'react' || name === 'date-fns') return require(name);
            return {
                __esModule: true,
                default: passthrough,
                useDocumentTitle: () => {},
                TroparionFavsHome: passthrough,
                HeightUpdater: passthrough,
                ...mocks[name],
            };
        },
    });
    return renderToStaticMarkup(React.createElement(module.exports.default, { services }));
}

test('all broadcast placements appear only on the calendar, never on the services tab', () => {
    for (const placement of ['top', 'after-readings', 'middle', 'bottom']) {
        const banner = { placement, state: 'scheduled', occurrence: null };
        assert.equal(renderMain(false, banner).match(/Broadcast banner/g)?.length, 1, placement);
        const services = renderMain(true, banner);
        assert.ok(services.includes('Services list'), placement);
        assert.ok(!services.includes('Broadcast banner'), placement);
    }
});

test('a date without a broadcast renders neither tab with a broadcast banner', () => {
    assert.ok(!renderMain(false, null).includes('Broadcast banner'));
    assert.ok(!renderMain(true, null).includes('Broadcast banner'));
});
