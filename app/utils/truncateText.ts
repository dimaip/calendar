export const truncateText = (text: string, maxLength: number) => {
    if (!text || typeof text !== 'string') {
        return '';
    }
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.slice(0, maxLength)}…`;
};
