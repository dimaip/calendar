import assert from 'node:assert/strict';
import test from 'node:test';

import { createServiceTextGeometry } from './serviceTextGeometry.ts';

// Fixed document coordinates, measured at multiple viewport scroll positions.
// Legacy WebKit divides DOCUMENT positions and sizes by effective zoom, then
// subtracts the unscaled scroll offset (Document::convertAbsoluteToClientRects).
// Confirmed in iOS WebKit: at 150%, scaling the scroll offset causes 150px drift
// after scrolling 300px. A viewport-only scaling mock misses that regression.
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
    const viewport = { scrollX: 60, scrollY: 600 };
    const rendered = [new Rect(108, 480, 93, 30), new Rect(84, 520, 45, 30)];
    const browserRect = (rect, scales) => {
        const divisor = scales ? 1 : Number(root.style.zoom) * Number(outer.style.zoom);
        return new Rect(
            rect.x / divisor - viewport.scrollX,
            rect.y / divisor - viewport.scrollY,
            rect.width / divisor,
            rect.height / divisor
        );
    };
    class TextRange {
        selectNodeContents() {
            this.probe = true;
        }
        getBoundingClientRect() {
            if (this.probe) {
                return new Rect(0, 0, 12 * (scalesRanges ? Number(probe.style.zoom) || 1 : 1), 16);
            }
            return browserRect(new Rect(84, 480, 117, 70), scalesRanges);
        }
        getClientRects() {
            return rendered.map((rect) => browserRect(rect, scalesRanges));
        }
    }
    const globals = {
        document: { body, createElement: () => probe, createRange: () => new TextRange() },
        Range: TextRange,
        DOMRect: Rect,
        window: viewport,
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
        viewport,
        range: new TextRange(),
        paragraph: { getBoundingClientRect: () => browserRect(new Rect(84, 480, 330, 180), scalesElements) },
        rendered,
        assertRects(geometry) {
            const actual = [
                ...geometry.getClientRects(this.range),
                geometry.getBoundingClientRect(this.range),
                geometry.getBoundingClientRect(this.paragraph),
            ];
            const expected = [...rendered, new Rect(84, 480, 117, 70), new Rect(84, 480, 330, 180)].map((rect) =>
                browserRect(rect, true)
            );
            assert.equal(actual.length, expected.length);
            for (let index = 0; index < expected.length; index += 1) {
                for (const key of Object.keys(expected[index])) {
                    assert.ok(
                        Math.abs(actual[index][key] - expected[index][key]) < 1e-8,
                        `rectangle ${index} ${key}: expected ${expected[index][key]}, got ${actual[index][key]}`
                    );
                }
            }
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
                // Scrolling must not require a refresh of the zoom measurement.
                for (const [scrollX, scrollY] of [
                    [0, 0],
                    [60, 600],
                    [90, 900],
                    [0, 300],
                ]) {
                    Object.assign(browser.viewport, { scrollX, scrollY });
                    browser.assertRects(geometry);
                }
            }

            const readsAfterRefresh = browser.styleReads;
            for (let word = 0; word < 20; word += 1) browser.assertRects(geometry);
            assert.equal(browser.styleReads, readsAfterRefresh, 'word painting must not remeasure ancestor styles');
            if (scalesElements && scalesRanges) assert.equal(readsAfterRefresh, 0);
        });
    }
}
