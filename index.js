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
    image: 'event_1.png',
    description:
      'Roomy, relaxed pub with regular live music & bar food, plus sports events on the big screen.',
      location:{
        latitude: '51.511600',
          longitude: '-0.133100',
          latitudeDelta: '0.005',
          longitudeDelta: '0.005 * (SIZES.width / SIZES.height)',
        },
    },
  {
    id: 2,
    type: 'AFRICAN RESTAURANT',
    title: 'Enish',
    startingTime: '2023-09-25 15:00',
    image: 'event_2.png',
    description:
      'With 11 thriving branches across the UK & two in Dubai, Enish Restaurant has been serving authentic cuisine for almost decade Preparing dishes from the diverse culture of Nigeria, Enish brings you a real taste of the country and a special twist to some of your favourite dishes.',
      location:{
        latitude: '51.4839',
          longitude: '-0.06635',
          latitudeDelta: '0.005',
          longitudeDelta: '0.005 * (SIZES.width / SIZES.height)',
        },
    },
   {
    id: 3,
    type: 'PUB',
    title: 'The Royal Oak',
    startingTime: '2023-10-21 11:00',
    image: 'event_3.png',
    description:
      'Traditional Victorian corner pub with tiled exterior, specialising in cask and real ales.',
      location:{
        latitude: '51.5005',
          longitude: '-0.0916',
          latitudeDelta: '0.005',
          longitudeDelta: '0.005 * (SIZES.width / SIZES.height)',
        },
    },
  {
    id: 4,
    type: 'AFRICAN RESTAURANT',
    title: 'Akoko',
    startingTime: '2023-08-25 12:00',
    image: 'event_4.png',
    description:
      'Elevated West African dishes are paired with international wines at this warm, upmarket restaurant.',
      location:{
        latitude: '51.516994',
          longitude: '-0.136538',
          latitudeDelta: '0.005',
          longitudeDelta: '0.005 * (SIZES.width / SIZES.height)',
        },
    },
   {
    id: 5,
    type: 'BAR & LOUNGE',
    title: 'Ku Lounge',
    startingTime: '2023-09-21 09:10',
    image: 'event_5.png',
    description:
      'Stylish cocktail lounge bar with banquettes, contemporary chandeliers and pendant lights.',
      location:{
        latitude: '51.512071',
          longitude: '-0.129809',
          latitudeDelta: '0.005',
          longitudeDelta: '0.005 * (SIZES.width / SIZES.height)',
        },
    },
];

let Users = [
  {
      id: 1, 
      email: 'user1@email.com',
      password: 'password', 
      userToken: 'token123',
      fullName:'Maurice Mickelwhite',
      lastName: '',
      phoneNumber: '1029384756',
      county: 'London',
      country: 'United Kingdom',
      cover: 'cover1.png',
      avatar: 'avatar1.png'
  },
  {
      id: 2, 
      email: 'user2@email.com',
      password: 'pass1234', 
      userToken: 'token12345',
      fullName:'Mariam Goodhew',
      phoneNumber: '9876543210',
      county: 'Gloucester',
      country: 'United Kingdom',
      cover: 'cover2.png',
      avatar: 'avatar2.png'
  },
  {
      id: 3, 
      email: 'testuser@email.com',
      password: 'testpass', 
      userToken: 'testtoken',
      fullName:'Thomas Anderson',
      phoneNumber: '1234567890',
      county: 'Surrey',
      country: 'United Kingdom',
      cover: 'cover3.png',
      avatar: 'avatar3.png'
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Where2goo Backend</h1>')
})

app.get('/api/places', (req, res) => {
  res.json(places)
})


app.get('/api/users', (req, res) => {
  res.json(Users)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})