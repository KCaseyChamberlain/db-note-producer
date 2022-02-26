const fs = require('fs');
const express = require('express');
const { get } = require('express/lib/response');
const path = require("path");
const { notes } = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());


app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.post("/api/notes", (req, res) => {
    const note = createNewNote(req.body, notes);
    console.log(req.body);
    res.json(req.body);
});


function createNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});





// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });
