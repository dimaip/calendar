import assert from 'node:assert/strict';
import test from 'node:test';
import { onlineManager, QueryObserver } from '@tanstack/react-query';

import { queryClient } from './queryClient.ts';

test('starts persistent-cache reads even after the browser reports offline', async () => {
    onlineManager.setOnline(false);
    let reads = 0;
    const observer = new QueryObserver(queryClient, {
        queryKey: ['offline-cached-date'],
        queryFn: async () => {
            reads += 1;
            return { title: 'Previously cached day' };
        },
        retry: false,
    });
    const unsubscribe = observer.subscribe(() => {});
    try {
        await new Promise((resolve) => setImmediate(resolve));
        assert.equal(reads, 1, 'offline must not prevent the cache-backed query function from running');
        assert.equal(observer.getCurrentResult().status, 'success');
        assert.deepEqual(observer.getCurrentResult().data, { title: 'Previously cached day' });
    } finally {
        unsubscribe();
        queryClient.clear();
        onlineManager.setOnline(true);
    }
});

test('settles an offline cache miss instead of leaving a non-retrying query paused', async () => {
    onlineManager.setOnline(false);
    const observer = new QueryObserver(queryClient, {
        queryKey: ['offline-uncached-date'],
        queryFn: async () => {
            throw new Error('Not cached and network unavailable');
        },
        retry: false,
    });
    const unsubscribe = observer.subscribe(() => {});
    try {
        await new Promise((resolve) => setImmediate(resolve));
        assert.equal(observer.getCurrentResult().status, 'error');
        assert.equal(observer.getCurrentResult().fetchStatus, 'idle');
    } finally {
        unsubscribe();
        queryClient.clear();
        onlineManager.setOnline(true);
    }
});

test('still pauses network retries offline and resumes them on reconnection', async () => {
    onlineManager.setOnline(false);
    queryClient.mount();
    let attempts = 0;
    const observer = new QueryObserver(queryClient, {
        queryKey: ['offline-retry'],
        queryFn: async () => {
            attempts += 1;
            if (attempts === 1) {
                throw new Error('Network unavailable');
            }
            return 'Reconnected';
        },
        retry: 1,
        retryDelay: 0,
    });
    let resolvePaused;
    let resolveSuccess;
    const paused = new Promise((resolve) => {
        resolvePaused = resolve;
    });
    const success = new Promise((resolve) => {
        resolveSuccess = resolve;
    });
    const unsubscribe = observer.subscribe((result) => {
        if (result.fetchStatus === 'paused') resolvePaused();
        if (result.status === 'success') resolveSuccess();
    });
    try {
        await paused;
        assert.equal(attempts, 1);
        onlineManager.setOnline(true);
        await success;
        assert.equal(attempts, 2);
        assert.equal(observer.getCurrentResult().data, 'Reconnected');
    } finally {
        unsubscribe();
        queryClient.unmount();
        queryClient.clear();
        onlineManager.setOnline(true);
    }
});
