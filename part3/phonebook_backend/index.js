require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person=require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
// manejo de errores 
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    // Error al buscar por un ID malformado
    return response.status(400).json({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    // Error de validación de Mongoose
    return response.status(400).json({ error: error.message });
  } 

  // Para cualquier otro error, asegúrate de enviar un mensaje genérico
  return response.status(500).json({ error: 'An unexpected error occurred' });
};

// starts morgan configuration
// Middleware personalizado para almacenar el body en req.body
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    req.bodyData = JSON.stringify(req.body) // Guarda el body como JSON en req.bodyData
  }
  next()
})
// Configura morgan para usar un formato personalizado
morgan.token('body', (req) => req.bodyData || '') // Agrega el token 'body' para morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// ends morgan configuration

// mostrar pagina de informacion
app.get('/info', (request, response) => {
  const fechaActual = new Date()
  Person.countDocuments({})
  .then(count => {
    // Ahora `count` contiene el total de documentos
    response.send('<p>Phonebook has info for ' +count+ ' people.</p>' + '<p>' + fechaActual + '</p>')
  })
  .catch(error =>  next(error))
})

// mostrar todas las personas
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// obtener solo una persona a traves de la url con el id
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id// No es necesario convertir `id` a un número
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).send({ error: 'Note not found' })
      }
    })
    .catch(error =>  next(error))
})

// borrar personas de la agenda

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id // No es necesario convertir `id` a un número

  Person.findByIdAndDelete(id)
    .then(person => {
      if (person) {
        response.status(204).end(); // Devuelve 204 No Content si la persona fue eliminada
      } else {
        response.status(404).send({ error: 'Person not found' })
      }
    })
    .catch(error =>  next(error))
})
// agregar personas a la agenda

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined) {
  return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number || false,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error =>  next(error))
})

//modificar personas de la agenda

app.put('/api/persons/:id', (request, response, next) => { 
  const id = request.params.id // Obtén el ID desde los parámetros de la URL
  const body = request.body

  const updatedPerson = {
    name: body.name, 
    number: body.number  // Incluye cualquier campo que quieras actualizar
  }

  // Utiliza findByIdAndUpdate para buscar y actualizar el documento en un solo paso
  Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true })
    .then(person => {
      if (person) {
        response.json(person); // Envía la nota actualizada como respuesta
      } else {
        response.status(404).send({ error: 'Person not found' })
      }
    })
    .catch(error =>  next(error))
})


// conexion al puerto y mensaje de servidor activo
const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
app.use(errorHandler)