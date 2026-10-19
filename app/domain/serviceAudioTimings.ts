export interface ServiceAudioTimings {
    version: number;
    language: string;
    serviceId: string;
    audioSha256: string;
    blocks: Array<{
        text: string;
        section: string;
        words: Array<{ index: number; start: number; end: number; score: number }>;
    }>;
}

export interface ServiceTextToken {
    value: string;
    start: number;
    end: number;
}

// Preserve the original offsets so accented words can be highlighted without rewriting MDX.
export const serviceTextTokens = (text: string): ServiceTextToken[] => {
    const ignored = Array.from(text.matchAll(/\([^)]*\)|^\s*Припев\s*/gi), (match) => [
        match.index,
        match.index + match[0].length,
    ]);
    return Array.from(text.matchAll(/(?:[а-яёa-z0-9]|\u0301)+/gi))
        .filter((match) => !ignored.some(([start, end]) => match.index >= start && match.index < end))
        .map((match) => ({
            value: match[0]
                .toLowerCase()
                .replace(/ё/g, 'е')
                .replace(/\u0301/g, ''),
            start: match.index,
            end: match.index + match[0].length,
        }));
};

export const findSpokenWord = <T extends { start: number; end: number }>(words: T[], position: number): T | null => {
    let left = 0;
    let right = words.length;
    while (left < right) {
        const middle = Math.floor((left + right) / 2);
        if (words[middle].start <= position) left = middle + 1;
        else right = middle;
    }
    const word = words[left - 1];
    return word && position <= word.end + 0.15 ? word : null;
};
