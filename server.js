const fs = require('fs');
const express = require('express');
const path = require("path");
var notes = require('./db/db.json');
var dataBase = path.join(__dirname, "./db/db.json");

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// HTML routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API route
app.get('/api/notes', (req, res) => {
    fs.readFile(dataBase, "utf-8", function (err, noteValues) {
        if (err) throw err
        else {
            noteValues = JSON.parse(noteValues)
            return res.json(noteValues)
        }
    })
});

// ID route
app.get('/api/notes/:id', (req, res) => {
    var selectedNote = req.params.id
    for (var i = 0; i < notes.length; i++) {
        if(selectedNote == notes[i].id){
            return res.json(notes[i])
        }
    }
});

// delete note route
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(dataBase, "utf-8", function (err) {
        if (err) throw err
        else {
            console.log("Reading notes for deletion")
        }
    })
    var selectedNote = req.params.id
    for (var i = 0; i < notes.length; i++) {
        if(selectedNote == notes[i].id){
            for (var i = notes.length - 1; i >= 0; --i) {
                if (notes[i].id == selectedNote) {
                    notes.splice(i,1);
                    console.log(notes)
                }
            }
        }
    }
    fs.writeFile(dataBase, JSON.stringify(notes), function (err, noteValues) {
        if (err) throw err
        else {
            return res.json(noteValues)
        }
    })
});

// post note route
app.post("/api/notes", (req, res) => {
    var note = req.body;
    fs.readFile(dataBase, "utf-8", function (err, res) {
        if (err) throw err
        else {
            console.log("Posting note!")
            notes = JSON.parse(res)
            notes.push(note)
            for (var i = 0; i < notes.length; i++) {
                notes[i].id = i.toString()
            }
            fs.writeFile(dataBase, JSON.stringify(notes), function (err) {
                if (err) throw err
                else {
                    console.log("Note has been added bossman!")
                }
            })
        }
    })
    res.json(note)
})

    app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});