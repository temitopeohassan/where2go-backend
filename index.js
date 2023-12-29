const express = require('express')
const app = express()


app.use(express.json())
app.use(express.static('public'));

require('dotenv').config();
const queries = require('./queries');

console.log(queries);


app.get('/', (req, res) => {
  res.send('<h1>Where2goo Backend</h1>')
})

app.get('/api/places',async (req, res) => {
  const places = await queries.getPlaces();
  res.json(places);
})

app.get('/api/places/:placeId',async (req, res) => {
  const id = req.params.placeId; // Change this line
  const places = await queries.getSinglePlace(id);
  res.json(places);
})

app.get('/api/comments/:placeId', async (req, res) => {
  const placeId = req.params.placeId; // Change this line
  const comments = await queries.getComments(placeId);
  res.json(comments);
});

app.post("/api/comments", async (req, res) => {
  try {
    const { place_id, fullName, comment } = req.body;
    await queries.insertComment(place_id, fullName, comment);
    res.status(200).json({ message: 'Comment posted successfully' });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/users', async (req, res) => {
  const users = await queries.getUsers();
  res.json(users);
});

app.get('/api/users/:id',async (req, res) => {
  const id = req.params.id; // Change this line
  const users = await queries.getSingleUser(id);
  res.json(users);
})


app.post("/api/users", async (req,res)=>{
  const { email, fullName, password } = req.body
  const user = await queries.insertUser(email, fullName, password)
  res.send(user)
  })

  app.post("/api/favourites", async (req,res)=>{
    const { places_id, users_id, status } = req.body
    const favourite = await queries.insertFavourite(places_id, users_id, status)
    res.send(favourite)
    })


    app.delete("/api/favourites/:places_id/:users_id", async (req, res) => {
      const { places_id, users_id } = req.params;
      
      try {
        await queries.deleteFavourite(places_id, users_id);
        res.send({ success: true, message: "Favorite deleted successfully" });
      } catch (error) {
        res.status(500).send({ success: false, message: "Failed to delete favorite" });
      }
    });
    
    
    app.get('/api/favourites/:userId', async (req, res) => {
      const userId = req.params.userId;
      const favourites = await queries.getFavourites(userId);
      res.json(favourites);
    });

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})