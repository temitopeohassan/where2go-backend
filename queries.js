







// import mysql package

const mysql = require('mysql2/promise');

// mysql database connection

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// fetch all places in database

async function getPlaces() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM places");
    return rows;
  } finally {
    connection.release();
  }
}

// fetch single place based on place ID 

async function getSinglePlace(id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM places WHERE id = ?", [id]);
    return rows;
  } finally {
    connection.release();
  }
}

// fetch comments from database based on place ID

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

// insert a comment into a specific place

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



// fetch the information of all users

 async function getUsers() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM users");
    return rows;
  } finally {
    connection.release();
  }
}

// fetch the information of a singe user based on user ID

async function getSingleUser(id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows;
  } finally {
    connection.release();
  }
}

// create a new user record

async function insertUser(email, fullName, password) {
  const connection = await pool.getConnection();
  try {
    await connection.query("INSERT INTO users (email, fullName, password) VALUES (?, ?, ?)", [email, fullName, password]);
  } finally {
    connection.release();
  }
}

// get the favourites of a specific user

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
      return rows || []; 
    } finally {
      connection.release();
    }
  }

// create a new favourite record for a place for a specific user

async function insertFavourite(places_id, users_id, status) {
  const connection = await pool.getConnection();
  try {
    await connection.query("INSERT INTO favourites (places_id, users_id, status) VALUES (?, ?, ?)", [places_id, users_id, status]);
  } catch (error) {
    console.error("Error inserting favorite:", error);
    throw new Error("Failed to insert favorite");
  } finally {
    connection.release();
  }
}

// delete a favourite record for a place for a specific user

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

fetchData();

// Export all functions
module.exports = {
    getPlaces,
    getSinglePlace,
    getComments,
    insertComment,
    getFavourites,
    getUsers,
    getSingleUser,
    insertUser,
    insertFavourite,
    deleteFavourite,
    fetchData,
  };