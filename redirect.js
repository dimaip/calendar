const express = require('express');

const app = express();
const port = process.env.NODE_PORT || 3000;

app.use((req, res) => {
    res.redirect(301, 'https://molitva.app' + req.path);
});

app.listen(port, () => console.log(`=== Go to http://localhost:${port} ===`));
