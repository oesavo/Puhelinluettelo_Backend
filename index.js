const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

let persons = [
        {
          "name": "Mary Poppendieck",
          "number": "39-23-6423122",
          "id": "4"
        },
        
        {
          "id": "54bf",
          "name": "LISSÄÄ",
          "number": "TÄMÄ"
        },
        {
          "id": "4535",
          "name": "JES",
          "number": "2211"
        },
        {
          "id": "6a5f",
          "name": "MOI",
          "number": "1"
        },
        {
          "id": "fd5b",
          "name": "MOI11",
          "number": "1"
        },
        {
          "id": "1d81",
          "name": "MINÄ",
          "number": "78"
        },
        {
          "id": "d682",
          "name": "Ppp",
          "number": "123"
        },
        {
          "id": "0910",
          "name": "Ppps",
          "number": "123"
        },
        {
          "id": "c52a",
          "name": "lisäätty",
          "number": "6578"
        },
        {
            "id": "0987",
            "name": "Uusin nimi",
            "number": "044"
        },
        {
          "id": "1111",
          "name": "Jos näet tämän niin nimet tulevat backendistä",
          "number": "123 456 789"
      }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
    console.log("numerot lähetetty")
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
        console.log("Ei löytynyt")
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
    console.log("Henkilö poistettu")
})

app.post('/api/persons', (request, response) => {
  if (!(request.body.name) || !(request.body.number)) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  if (persons.find(person => person.name === request.body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  
  const person = request.body
  person.id = Math.floor(Math.random() * 9999)

  persons.concat(person)
  console.log(person)
  response.json(person)
})

app.get('/info', (request, response) => {
    response.send(`<h1>Tervettuloa infoon</h1> 
         <p>Puhelinluettelossa on ${persons.length} henkilöä</p>
        <p>${new Date()}</p>`)
    console.log("informaatio annettu")
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})