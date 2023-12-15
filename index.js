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

const setContext = (req, res, next) => {
  // Set your context data here
  req.context = {
    userId: 'defaultUserId', // Set your default or initial userId here
    // other context data
  };
  next();
};

// Assuming you have middleware to set context
app.use((req, res, next) => {
  req.context = {
    userId: 'defaultUserId', // Set your default or initial userId here
    // other context data
  };
  next();
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

async function getSinglePlace(id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM places WHERE id = ?", [id]);
    return rows;
  } finally {
    connection.release();
  }
}

async function getComments(placeId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(`
      SELECT comments.id, comments.fullName, comments.comment, places.id as placeId
FROM comments
JOIN places ON comments.places_id = places.id
WHERE places.id = ?
ORDER BY comments.time DESC;`, [placeId]);
    return rows;
  } finally {
    connection.release();
  }
}

async function insertComment(places_id, fullName, comment) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      "INSERT INTO comments (places_id, fullName, comment) VALUES (?, ?, ?)",
      [places_id, fullName, comment]
    );
  } finally {
    connection.release();
  }
}


async function getFavourites(userId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(`
      SELECT favourites.id, favourites.status, places.id as placeId, places.type, places.title, places.image, users.id as userId
      FROM favourites
      JOIN places ON favourites.places_id = places.id
      JOIN users ON favourites.users_id = users.id
      WHERE users_id = ?;
    `, [userId]);
    return rows || []; // Return an empty array if no favorites are found
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

async function getSingleUser(id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
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

async function insertFavourite(places_id, users_id, status) {
  const connection = await pool.getConnection();
  try {
    await connection.query("INSERT INTO favourites (places_id, users_id, status) VALUES (?, ?, ?)", [places_id, users_id, status]);
  } catch (error) {
    // Handle the error, you can log it or throw a custom error
    console.error("Error inserting favorite:", error);
    throw new Error("Failed to insert favorite");
  } finally {
    connection.release();
  }
}

async function deleteFavourite(places_id, users_id) {
  const connection = await pool.getConnection();
  try {
    await connection.query("DELETE FROM favourites WHERE places_id = ? AND users_id = ?", [places_id, users_id]);
  } catch (error) {
    console.error("Error deleting favorite:", error);
    throw new Error("Failed to delete favorite");
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

app.get('/api/places/:placeId',async (req, res) => {
  const id = req.params.placeId; // Change this line
  const places = await getSinglePlace(id);
  res.json(places);
})

app.get('/api/comments/:placeId', async (req, res) => {
  const placeId = req.params.placeId; // Change this line
  const comments = await getComments(placeId);
  res.json(comments);
});

app.post("/api/comments", async (req, res) => {
  try {
    const { place_id, fullName, comment } = req.body;
    await insertComment(place_id, fullName, comment);
    res.status(200).json({ message: 'Comment posted successfully' });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/users', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.get('/api/users/:id',async (req, res) => {
  const id = req.params.id; // Change this line
  const users = await getSingleUser(id);
  res.json(users);
})


app.post("/api/users", async (req,res)=>{
  const { email, fullName, password } = req.body
  const user = await insertUser(email, fullName, password)
  res.send(user)
  })

  app.post("/api/favourites", async (req,res)=>{
    const { places_id, users_id, status } = req.body
    const favourite = await insertFavourite(places_id, users_id, status)
    res.send(favourite)
    })


    app.delete("/api/favourites/:places_id/:users_id", async (req, res) => {
      const { places_id, users_id } = req.params;
      
      try {
        await deleteFavourite(places_id, users_id);
        res.send({ success: true, message: "Favorite deleted successfully" });
      } catch (error) {
        res.status(500).send({ success: false, message: "Failed to delete favorite" });
      }
    });
    
    
    app.get('/api/favourites/:userId', async (req, res) => {
      const userId = req.params.userId;
      const favourites = await getFavourites(userId);
      res.json(favourites);
    });

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})