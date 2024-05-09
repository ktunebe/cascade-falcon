const express = require('express')
const {writeToDb, readFromDb} = require('./file-system.js')
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({length: 10})
const path = require('path')
const app = express()
const PORT = 3001;


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});


app.get("/api/notes", async (req, res) => {
    const notes = await readFromDb()
    res.json(notes)
    console.log(notes)
});

app.post("/api/notes", async (req, res) => {
    const newNote = req.body
    const notes = await readFromDb()
    newNote.id = uid.rnd()
    if (notes.some(note => note.id === newNote.id)) {
        newNote.id = uid.rnd()
    }
    notes.push(newNote) 
    await writeToDb(notes)
    res.json(notes)
});

app.delete("/api/notes/:id", async (req, res) => {
    const notes = await readFromDb()
    const idToDelete = req.params.id
    const newNotes = notes.filter(note => note.id !== idToDelete)
    await writeToDb(newNotes)
    // res.json(newNotes)
    res.end()
});


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});