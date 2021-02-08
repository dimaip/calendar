const darkQuery = window.matchMedia?.('(prefers-color-scheme: dark)');

darkQuery?.addEventListener?.('change', (e) => {
    window.location.reload();
});

const isDarkMode = () => darkQuery?.matches;

export default isDarkMode;
