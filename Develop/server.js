const express = require('express');
const path = require('path');
const ShortUniqueId = require('short-unique-id');
const { notes } = require('./db/db.json');

const app = express();
const PORT = 3001;

const uid = new ShortUniqueId();

app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.json(notes)
});

app.post('/api/notes', (req, res) => {
    //validate title and text meet criteria
    const bodyObj = {
        "id": uid(),
        "title": req.body.title,
        "text": req.body.text
    }
    //get request into the array in db.json (notes.push)
    notes.push(bodyObj)
    res.json(notes)
});

// app.delete()

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);