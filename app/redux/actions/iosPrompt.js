import { DISMISS_IOS_PROMPT } from 'constants/actionTypes';

export function dismissIosPrompt(timestamp) {
    return {
        type: DISMISS_IOS_PROMPT,
        payload: { timestamp },
    };
}
