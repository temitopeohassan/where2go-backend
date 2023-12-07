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

async function getPlaces() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM places");
    return rows;
  } finally {
    connection.release();
  }
}

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

async function insertUser(email, fullName, password) {
  const connection = await pool.getConnection();
  try {
    await connection.query("INSERT INTO users (email, fullName, password) VALUES (?, ?, ?)", [email, fullName, password]);
  } finally {
    connection.release();
  }
}

async function fetchData() {
  const users = await getUsers();

 }

// Call the async function
fetchData();



app.get('/', (req, res) => {
  res.send('<h1>Where2goo Backend</h1>')
})

app.get('/api/places',async (req, res) => {
  const places = await getPlaces();
  res.json(places);
})


app.get('/api/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.post("/api/users", async (req,res)=>{
  const { email, fullName, password } = req.body
  const user = await insertUser(email, fullName, password)
  res.send(user)
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})