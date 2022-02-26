const express = require('express');
const { get } = require('express/lib/response');
const path = require("path");
const { notes } = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



app.post('/notes', (req, res) => {
    // req.body is where our incoming content will be
    console.log(req.body);
    res.json(req.body);
  });

//   app.post("/notes", (req, res) => {
//     req.body.id = notes.length.toString();

//     // if (!validateNotes(req.body)) {
//     //     res.status(400).send("The notes is not properly formatted.");
//     // } else {
//     //     const notes = createNewNotes(req.body, notes);
//     //     res.json(notes);
//     // }
// });


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});