//require the npm packages needed to run the backend
const express = require('express');
const path = require('path');
//package used to create a unique ID for each note created
const ShortUniqueId = require('short-unique-id');
//destructure the notes json object to use later on
const { notes } = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

const uid = new ShortUniqueId();

app.use(express.json());
app.use(express.static('public'));

//HTML route to take the user to the page with all the notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//API route to read the notes to the web page
app.get('/api/notes', (req, res) => {
    res.json(notes)
});

//API route to create new notes and add to the notes object
app.post('/api/notes', (req, res) => {
    const bodyObj = {
        "id": uid(),
        "title": req.body.title,
        "text": req.body.text
    }
    //get request into the array in db.json (notes.push)
    notes.push(bodyObj)
    res.json(notes)
});

// app.delete('/api/notes/:id', (req, res) => {
//     //new notes = notes.id === req.param.id
//     //return new notes
// })

//HTML route to the home page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);