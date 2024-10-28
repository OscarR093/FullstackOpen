const express = require('express')
const app = express()

app.use(express.json())

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
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0;
    // Generar un ID alto aleatorio
    const randomId = maxId + Math.floor(Math.random() * 1000000) + 1;
    return randomId;
};

app.get('/info', (request, response) => {
    const numberOFPersons= persons.length;
    const fechaActual=new Date();
    const message="<p>Phonebook has info for " + numberOFPersons + " people.</p>" + "<p>"+fechaActual+"</p>"
    response.send(message)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
    response.json(person)
    } else {
    response.status(404).end()
    }
    })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
const body = request.body

if (!body.name) {
    return response.status(400).json({ 
    error: 'name is missing' 
    })
}
if (!body.number) {
    return response.status(400).json({ 
    error: 'number is missing' 
    })
}
const nameIsAlreadyRegistered=persons.filter(person=>person.name === body.name)
console.log(nameIsAlreadyRegistered.length)
if(nameIsAlreadyRegistered.length>0){
    return response.status(400).json({ 
        error: 'name is already registered' 
        }) 
}
const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
    
}

persons = persons.concat(person)

response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})

