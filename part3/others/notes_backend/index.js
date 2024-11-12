require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//obtener todas las notas de la DB
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

//obtener notas por id
app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id// No es necesario convertir `id` a un número
  Note.findById(id)
    .then(note => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).send({ error: 'Note not found' })
      }
    })
    .catch(error =>  next(error))
})


app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch(error =>  next(error))
})

app.put('/api/notes/:id', (request, response) => { 
  const id = request.params.id // Obtén el ID desde los parámetros de la URL
  const body = request.body

  const updatedNote = {
    important: body.important, 
    content: body.content  // Incluye cualquier campo que quieras actualizar
  };

  // Utiliza findByIdAndUpdate para buscar y actualizar el documento en un solo paso
  Note.findByIdAndUpdate(id, updatedNote, { new: true, runValidators: true })
    .then(note => {
      if (note) {
        response.json(note); // Envía la nota actualizada como respuesta
      } else {
        response.status(404).send({ error: 'Note not found' })
      }
    })
    .catch(error =>  next(error))
})


const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
app.use(errorHandler)