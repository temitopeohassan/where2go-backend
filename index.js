const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'));

let places = [
  {
    id: 1,
    type: 'IRISH PUB',
    title: 'Waxy O\' Connors\'s London',
    startingTime: '2023-09-21 15:00',
    image: '/assets/images/event_1.png',
    description:
      'Non exercitation ullamco reprehenderit incididunt. Officia incididunt id exercitation velit aliqua ut deserunt do non. Aliquip sunt dolor enim occaecat ullamco id consectetur .',
  },
  {
    id: 2,
    type: 'AFRICAN RESTAURANT',
    title: 'Enish',
    startingTime: '2023-09-25 15:00',
    image: '/assets/images/event_2.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur elit adipiscing elit. Venenatis pulvinar a amet in, suspendisse vitae, posuere eu tortor et. Und commodo, fermentum, mauris leo eget.',
  },
   {
    id: 3,
    type: 'PUB',
    title: 'The Royal Oak',
    startingTime: '2023-10-21 11:00',
    image: '/assets/images/event_3.png',
    description:
      'Non exercitation ullamco reprehenderit incididunt. Officia incididunt id exercitation velit aliqua ut deserunt do non. Aliquip sunt dolor enim occaecat ullamco id consectetur .',
  },
  {
    id: 4,
    type: 'AFRICAN RESTAURANT',
    title: 'Akoko',
    startingTime: '2023-08-25 12:00',
    image: '/assets/images/event_4.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur elit adipiscing elit. Venenatis pulvinar a amet in, suspendisse vitae, posuere eu tortor et. Und commodo, fermentum, mauris leo eget.',
  },
   {
    id: 5,
    type: 'BAR & LOUNGE',
    title: 'Ku Lounge',
    startingTime: '2023-09-21 09:10',
    image: '/assets/images/event_5.png',
    description:
      'Non exercitation ullamco reprehenderit incididunt. Officia incididunt id exercitation velit aliqua ut deserunt do non. Aliquip sunt dolor enim occaecat ullamco id consectetur .',
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Where2goo places</h1>')
})

app.get('/api/places', (req, res) => {
  res.json(places)
})

const generateId = () => {
  const maxId = places.length > 0
    ? Math.max(...places.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/places', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const place = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  places = places.concat(place)

  response.json(place)
})

app.get('/api/places/:id', (request, response) => {
  const id = Number(request.params.id)
  const place = places.find(place => place.id === id)

  if (place) {
    response.json(place)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/places/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = places.filter(place => place.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})