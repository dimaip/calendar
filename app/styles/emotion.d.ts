import '@emotion/react';
import type { AppTheme } from './getTheme';

declare module '@emotion/react' {
    // Declaration merging maps Emotion's theme context to the complete application theme.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface Theme extends AppTheme {}
}
