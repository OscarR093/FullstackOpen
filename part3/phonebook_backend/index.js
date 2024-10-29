const express = require('express')
const morgan=require('morgan')
const app = express()

app.use(express.json())
//app.use(morgan(''))

let persons = [
    { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
    },
    { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
    },
    { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
    },
    { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
    }
]
//starts morgan configuration
// Middleware personalizado para almacenar el body en req.body
app.use((req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        req.bodyData = JSON.stringify(req.body) // Guarda el body como JSON en req.bodyData
    }
    next();
});
// Configura morgan para usar un formato personalizado
morgan.token('body', (req) => req.bodyData || '') // Agrega el token 'body' para morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
//ends morgan configuration 

//id generado 
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    // Generar un ID alto aleatorio
    const randomId = maxId + Math.floor(Math.random() * 1000000) + 1
    return randomId
}

//mostrar pagina de informacion 
app.get('/info', (request, response) => {
    const numberOFPersons= persons.length
    const fechaActual=new Date()
    const message="<p>Phonebook has info for " + numberOFPersons + " people.</p>" + "<p>"+fechaActual+"</p>"
    response.send(message)
})

//mostrar todas las personas
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//obtener solo una persona a traves de la url con el id 
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
    response.json(person)
    } else {
    response.status(404).end()
    }
    })

// borrar personas de la agenda

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// agregar personas a la agenda

app.post('/api/persons', (request, response) => {
const body = request.body
//comprobar nombre
if (!body.name) {
    return response.status(400).json({ 
    error: 'name is missing' 
    })
}
//comprobar numero telefonico 
if (!body.number) {
    return response.status(400).json({ 
    error: 'number is missing' 
    })
}
//comprobar si el nombre ya ha sido registrado
const nameIsAlreadyRegistered=persons.filter(person=>person.name === body.name)
console.log(nameIsAlreadyRegistered.length)
if(nameIsAlreadyRegistered.length>0){
    return response.status(400).json({ 
        error: 'name is already registered' 
        }) 
}
//crear el el objeto persona a agregar
const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
    
}
    persons = persons.concat(person)
    response.json(person)
})

//conexion al puerto y mensaje de servidor activo 
const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

