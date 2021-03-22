import 'regenerator-runtime/runtime';
import precache from './precache';

onmessage = () => {
    precache();
};
