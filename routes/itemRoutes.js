//GET / notes - Should return the notes.html file
//GET * - Should return the index.html file
//GET / api / notes - Should read the db.json file and return all saved notes as JSON.
//POST / api / notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
//DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.


const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

router.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

router.post('/api/notes', (req, res) => {
  const newNote = req.body
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    const notes = JSON.parse(data)
    notes.push(item)
    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      res.sendStatus(200)
    })
  })
})

router.delete('/api/notes/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    const deletedNotes = JSON.parse(data)
    for (let i=0; i < deletedNotes.length; i++) {
      const dbElement = deletedNotes[i]
      if (dbElement.id === req.params.id) {
        deletedNotes.splice(i, 1)
      }
    }
    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      res.sendStatus(200) 
    })
  })
})

module.exports = router