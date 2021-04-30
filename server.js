// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.static('public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', function (err, data) {
    if (err) throw err;
    var notesArray = JSON.parse(data);
    res.json(notesArray);
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile('./db/db.json', 'utf8', function (err, data) {
    if (err) throw err;
    var arrayOfNoteObjects = JSON.parse(data);
    console.log(arrayOfNoteObjects);
    arrayOfNoteObjects.push(newNote);
    fs.writeFile(
      './db/db.json',
      JSON.stringify(arrayOfNoteObjects),
      'utf-8',
      function (err) {
        if (err) throw err;
        console.log('DONE!');
      }
    );
  });
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
