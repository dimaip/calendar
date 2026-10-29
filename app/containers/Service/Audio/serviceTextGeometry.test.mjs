import assert from 'node:assert/strict';
import test from 'node:test';

import { createServiceTextGeometry } from './serviceTextGeometry.ts';

// Model both browser geometry contracts using fixed rendered coordinates. The
// legacy WebKit contract divides viewport positions AND sizes by effective zoom.
const browserGeometry = (t, scalesElements, scalesRanges) => {
    class Rect {
        constructor(x, y, width, height) {
            Object.assign(this, { x, y, width, height, left: x, top: y, right: x + width, bottom: y + height });
        }
    }
    const body = { appendChild() {} };
    let probesRemoved = 0;
    let styleReads = 0;
    const probe = {
        style: {},
        getBoundingClientRect() {
            return new Rect(0, 0, 20 * (scalesElements ? Number(this.style.zoom) || 1 : 1), 16);
        },
        remove() {
            probesRemoved += 1;
        },
    };
    const outer = { parentElement: null, style: { zoom: '1' } };
    const root = { parentElement: outer, style: { zoom: '1' } };
    const rendered = [new Rect(48, -120, 93, 30), new Rect(24, -80, 45, 30)];
    const browserRect = (rect, scales) => {
        const divisor = scales ? 1 : Number(root.style.zoom) * Number(outer.style.zoom);
        return new Rect(rect.x / divisor, rect.y / divisor, rect.width / divisor, rect.height / divisor);
    };
    class TextRange {
        selectNodeContents() {
            this.probe = true;
        }
        getBoundingClientRect() {
            if (this.probe) {
                return new Rect(0, 0, 12 * (scalesRanges ? Number(probe.style.zoom) || 1 : 1), 16);
            }
            return browserRect(new Rect(24, -120, 117, 70), scalesRanges);
        }
        getClientRects() {
            return rendered.map((rect) => browserRect(rect, scalesRanges));
        }
    }
    const globals = {
        document: { body, createElement: () => probe, createRange: () => new TextRange() },
        Range: TextRange,
        DOMRect: Rect,
        getComputedStyle(element) {
            styleReads += 1;
            return element.style;
        },
    };
    for (const [key, value] of Object.entries(globals)) {
        const descriptor = Object.getOwnPropertyDescriptor(globalThis, key);
        Object.defineProperty(globalThis, key, { configurable: true, value });
        t.after(() => {
            if (descriptor) Object.defineProperty(globalThis, key, descriptor);
            else delete globalThis[key];
        });
    }
    return {
        root,
        outer,
        range: new TextRange(),
        paragraph: { getBoundingClientRect: () => browserRect(new Rect(24, -120, 330, 180), scalesElements) },
        rendered,
        assertRects(geometry) {
            assert.deepEqual(geometry.getClientRects(this.range), rendered);
            assert.deepEqual(geometry.getBoundingClientRect(this.range), new Rect(24, -120, 117, 70));
            assert.deepEqual(geometry.getBoundingClientRect(this.paragraph), new Rect(24, -120, 330, 180));
        },
        get probesRemoved() {
            return probesRemoved;
        },
        get styleReads() {
            return styleReads;
        },
    };
};

for (const scalesElements of [true, false]) {
    for (const scalesRanges of [true, false]) {
        test(`zoomed text uses viewport coordinates (element scaling: ${scalesElements}, range scaling: ${scalesRanges})`, (t) => {
            const browser = browserGeometry(t, scalesElements, scalesRanges);
            browser.root.style.zoom = '1.5';
            const geometry = createServiceTextGeometry(browser.root);
            browser.assertRects(geometry);
            assert.equal(browser.probesRemoved, 1, 'feature detection must leave no DOM behind');

            // Zoom changes while the same word is paused, including small text,
            // maximum text size, and the parallel-language wrapper's 80% scale.
            for (const [inner, outer] of [
                [0.5, 1],
                [3, 1],
                [1.5, 0.8],
                [1, 1],
            ]) {
                browser.root.style.zoom = String(inner);
                browser.outer.style.zoom = String(outer);
                geometry.refresh();
                browser.assertRects(geometry);
            }

            const readsAfterRefresh = browser.styleReads;
            for (let word = 0; word < 20; word += 1) browser.assertRects(geometry);
            assert.equal(browser.styleReads, readsAfterRefresh, 'word painting must not remeasure ancestor styles');
            if (scalesElements && scalesRanges) assert.equal(readsAfterRefresh, 0);
        });
    }
}
