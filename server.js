const express = require('express');
const path = require("path");
const { notes } = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/assets/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/assets/index.html'));
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});