export const truncateText = (text: string, maxLength: number) => {
    if (!text) {
        return '';
    }
    if (text.length <= maxLength || typeof text !== 'string') {
        return text;
    }
    return `${text.slice(0, maxLength)}…`;
};
