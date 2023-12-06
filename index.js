const express = require('express')
const app = express()


app.use(express.json())
app.use(express.static('public'));

require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

 async function getUsers() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM users");
    return rows;
  } finally {
    connection.release();
  }
}

async function getSingleUser(userId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [userId]);
    return rows;
  } finally {
    connection.release();
  }
}

async function insertUser(name, email, password) {
  const connection = await pool.getConnection();
  try {
    await connection.query("INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)", [fullName, email, password]);
  } finally {
    connection.release();
  }
}

async function fetchData() {
  const users = await getUsers();

  const userId = 2; // Replace with the desired user ID
  const singleUser = await getSingleUser(userId);
}

// Call the async function
fetchData();

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

app.get('/', (req, res) => {
  res.send('<h1>Where2goo Backend</h1>')
})

app.get('/api/places', (req, res) => {
  res.json(places)
})


app.get('/api/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.post("/users", async (req,res)=>{
  const { email, fullName, password } = req.body
  const user = await createUser(email, fullName, password)
  res.send(user)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})