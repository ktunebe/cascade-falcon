const express = require('express')
const writeToDb = require('./write-file.js')
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({length: 10})
const path = require('path')
const app = express()
const PORT = 3001;
const notes = require('./db/db.json')

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});


app.get("/api/notes", (req, res) => {
    res.json(notes)
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body
    newNote.id = uid.rnd()
    if (notes.some(note => note.id === newNote.id)) {
        newNote.id = uid.rnd()
    }
    notes.push(newNote) 
    writeToDb(JSON.stringify(notes))
    res.json(notes)
    // console.log(notes)
});

app.delete("/api/notes/:id", (req, res) => {
    const idToDelete = req.params.id
    const newNotes = notes.filter(note => note.id !== idToDelete)
    res.json(newNotes)
    writeToDb(JSON.stringify(newNotes))
});


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});