import assert from 'node:assert/strict';
import test from 'node:test';

import { registerServiceAudioMediaSession } from './serviceAudioMediaSession.ts';
import { serviceRecordings } from './serviceRecordings.ts';

const createEnvironment = (t) => {
    const handlers = new Map();
    const positions = [];
    const session = {
        metadata: null,
        playbackState: 'none',
        setActionHandler: (action, handler) => handlers.set(action, handler),
        setPositionState: (state) => positions.push(state),
    };
    const globals = {
        navigator: { mediaSession: session },
        window: { location: { href: 'https://molitva.app/#/date/2026-10-18/service/pokajanni' } },
        MediaMetadata: class {
            constructor(metadata) {
                Object.assign(this, metadata);
            }
        },
    };
    for (const [key, value] of Object.entries(globals)) {
        const original = Object.getOwnPropertyDescriptor(globalThis, key);
        Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
        t.after(() => {
            if (original) Object.defineProperty(globalThis, key, original);
            else delete globalThis[key];
        });
    }
    const audio = Object.assign(new EventTarget(), {
        duration: 120,
        currentTime: 15,
        playbackRate: 1,
        paused: true,
        ended: false,
        error: null,
    });
    return { audio, session, handlers, positions };
};

test('publishes recording metadata and app artwork without starting playback', (t) => {
    const { audio, session, positions } = createEnvironment(t);
    const cleanup = registerServiceAudioMediaSession(audio, serviceRecordings.pokajanni, () => {});
    assert.equal(session.metadata.title, 'Покаянный канон');
    assert.equal(session.metadata.artist, 'Богослужение на русском языке');
    assert.deepEqual(session.metadata.artwork, [
        { src: 'https://molitva.app/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ]);
    assert.equal(session.playbackState, 'paused');
    assert.equal(audio.paused, true);
    assert.deepEqual(positions.at(-1), { duration: 120, position: 15, playbackRate: 1 });
    cleanup();
});

test('updates the native timeline from media events without reporting on every timeupdate', (t) => {
    const { audio, session, positions } = createEnvironment(t);
    const cleanup = registerServiceAudioMediaSession(audio, serviceRecordings.pokajanni, () => {});
    audio.paused = false;
    audio.dispatchEvent(new Event('playing'));
    assert.equal(session.playbackState, 'playing');
    const count = positions.length;
    audio.currentTime = 40;
    audio.dispatchEvent(new Event('timeupdate'));
    assert.equal(positions.length, count);
    audio.dispatchEvent(new Event('waiting'));
    assert.equal(session.playbackState, 'playing');
    for (const event of ['seeking', 'seeked', 'ratechange', 'loadedmetadata', 'durationchange', 'pause']) {
        audio.currentTime += 5;
        audio.playbackRate = 1.5;
        audio.duration = 150;
        audio.paused = event === 'pause';
        audio.dispatchEvent(new Event(event));
        assert.deepEqual(positions.at(-1), { duration: 150, position: audio.currentTime, playbackRate: 1.5 });
    }
    assert.equal(session.playbackState, 'paused');
    audio.paused = false;
    audio.ended = true;
    audio.currentTime = 150;
    audio.dispatchEvent(new Event('ended'));
    assert.equal(session.playbackState, 'paused');
    assert.equal(positions.at(-1).position, 150);
    audio.ended = false;
    audio.error = new Error('Media unavailable');
    audio.dispatchEvent(new Event('error'));
    assert.equal(session.playbackState, 'paused');
    cleanup();
});

test('clears unknown duration and normalizes position and rate before reporting', (t) => {
    const { audio, positions } = createEnvironment(t);
    audio.duration = NaN;
    const cleanup = registerServiceAudioMediaSession(audio, serviceRecordings.pokajanni, () => {});
    assert.equal(positions.at(-1), undefined);
    audio.duration = 120;
    for (const [time, rate, position, playbackRate] of [
        [-10, 0, 0, 1],
        [NaN, NaN, 0, 1],
        [Infinity, Infinity, 0, 1],
        [200, 2, 120, 2],
    ]) {
        audio.currentTime = time;
        audio.playbackRate = rate;
        audio.dispatchEvent(new Event('seeked'));
        assert.deepEqual(positions.at(-1), { duration: 120, position, playbackRate });
    }
    for (const duration of [NaN, Infinity, 0, -1]) {
        audio.duration = duration;
        audio.dispatchEvent(new Event('durationchange'));
        assert.equal(positions.at(-1), undefined);
    }
    cleanup();
});

test('forwards system controls and removes listeners, handlers, metadata, and position on exit', (t) => {
    const { audio, session, handlers, positions } = createEnvironment(t);
    const actions = [];
    const cleanup = registerServiceAudioMediaSession(audio, serviceRecordings.pokajanni, (event) =>
        actions.push(event)
    );
    const stalePlay = handlers.get('play');
    for (const action of ['play', 'pause', 'stop', 'seekbackward', 'seekforward', 'seekto']) {
        const event = { action, seekTime: 50, seekOffset: 30 };
        handlers.get(action)(event);
        assert.equal(actions.at(-1), event);
    }
    cleanup();
    assert.equal(session.metadata, null);
    assert.equal(session.playbackState, 'none');
    assert.equal(positions.at(-1), undefined);
    assert.ok([...handlers.values()].every((handler) => handler === null));
    const count = positions.length;
    audio.dispatchEvent(new Event('playing'));
    audio.dispatchEvent(new Event('seeked'));
    stalePlay({ action: 'play' });
    assert.equal(positions.length, count);
    assert.equal(actions.length, 6);
});

test('unsupported APIs and actions do not prevent audio controls or cleanup', (t) => {
    const { audio, session, handlers } = createEnvironment(t);
    delete navigator.mediaSession;
    assert.equal(
        registerServiceAudioMediaSession(audio, serviceRecordings.pokajanni, () => {}),
        undefined
    );
    navigator.mediaSession = session;
    const constructor = globalThis.MediaMetadata;
    globalThis.MediaMetadata = undefined;
    assert.equal(
        registerServiceAudioMediaSession(audio, serviceRecordings.pokajanni, () => {}),
        undefined
    );
    globalThis.MediaMetadata = constructor;
    delete session.setPositionState;
    session.setActionHandler = (action, handler) => {
        if (action === 'stop' || action === 'seekto') throw new Error('Unsupported action');
        handlers.set(action, handler);
    };
    const actions = [];
    const cleanup = registerServiceAudioMediaSession(audio, serviceRecordings.pokajanni, (event) =>
        actions.push(event)
    );
    handlers.get('play')({ action: 'play' });
    assert.equal(actions.length, 1);
    assert.equal(handlers.has('stop'), false);
    session.setPositionState = () => {
        throw new Error('Position state unavailable');
    };
    assert.doesNotThrow(() => audio.dispatchEvent(new Event('seeked')));
    assert.doesNotThrow(cleanup);
    assert.equal(session.metadata, null);
});

test('an old player cannot update or clear a newer media session', (t) => {
    const { audio, session, handlers, positions } = createEnvironment(t);
    let oldActions = 0;
    const firstCleanup = registerServiceAudioMediaSession(audio, serviceRecordings.pokajanni, () => oldActions++);
    const oldPlay = handlers.get('play');
    const nextAudio = Object.assign(new EventTarget(), {
        duration: 300,
        currentTime: 80,
        playbackRate: 2,
        paused: false,
    });
    let nextActions = 0;
    const nextCleanup = registerServiceAudioMediaSession(
        nextAudio,
        serviceRecordings.chinPrigotovlenija,
        () => nextActions++
    );
    const count = positions.length;
    audio.dispatchEvent(new Event('seeked'));
    oldPlay({ action: 'play' });
    firstCleanup();
    assert.equal(positions.length, count);
    assert.equal(oldActions, 0);
    assert.equal(session.metadata.title, 'Чин приготовления');
    assert.equal(session.playbackState, 'playing');
    handlers.get('play')({ action: 'play' });
    assert.equal(nextActions, 1);
    nextCleanup();
});
