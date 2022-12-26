import 'regenerator-runtime/runtime.js';
import precache from './precache.ts';

onmessage = () => {
    precache();
};
