const express = require('express')
const app = express()
const corse = require( 'cors' )

let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(corse())
app.use(express.json())

app.get('/',(request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const currentDate =  new Date()
    const personsCount = data.length
    response.send('<p>phonebook has info for ' + personsCount + ' people</p>' + '<p>' + currentDate + '</p>')
})

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/api/testimonials', (request, response) => {
    response.json([
        { id: 1, name:'John Doe', text: 'This is a great service!' },
        { id: 2, name:'Jane Smith', text: 'I love using this app!' },
        { id: 3, name:'Alice Johnson', text: 'Highly recommend to everyone!' }
    ])
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = data.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end() 
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    data = data.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const generateId = () => {
        const maxId = data.length > 0 ? Math.max(...data.map(n => n.id)) : 0
        return (maxId + 1).toString()
    }

    if (!request.body.name || !request.body.number) {
        return response.status(400).json({ error: 'name or number missing' })
    }
    const person = {
        name: request.body.name,
        number: request.body.number
    }
    person.id = generateId()
    data.push(person)
    response.status(201).json(person)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
