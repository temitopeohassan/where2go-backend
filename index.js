const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./models/db');
const userRouter = require('./routes/user');
const Users = require('./models/user');
const Place = require('./models/place')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))
app.use(userRouter);

let places = [
]


app.get('/api/places', (request, response) => {
  Place.find({}).then(places => {
    response.json(places)
  })
})

app.post('/api/places', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const place = new Place({
    content: body.content,
    important: body.important || false,
  })

  place.save().then(savedPlace => {
    response.json(savedPlace)
  })
})

app.get('/api/places/:id', (request, response) => {
  Place.findById(request.params.id).then(place => {
    response.json(place)
  })
})

app.delete('/api/places/:id', (request, response) => {
  const id = Number(request.params.id)
  places = places.filter(place => place.id !== id)

  response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})