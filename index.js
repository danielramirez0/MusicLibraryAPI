//create a Node.js and Express.js backend server for my React Music Library Project.
const express = require("express");
const repoContext = require("./repository/repository-wrapper");
const cors = require("cors");
const { validateProduct } = require("./middleware//products-validation");

const app = express();
const listenPort = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// For Global Validation Middleware, use:
// app.use(validateProduct)
app.listen(5000, function () {
  console.log(`Server started. Listening on port ${listenPort}.`);
});

app.get("/", (req, res) => {
  return res.send("I'm listening");
});

// Have a GET endpoint to retrieve all songs in my data storage.
app.get("/api/songs", (req, res) => {
  const songs = repoContext.songs.findAllSongs();
  return res.send(songs);
});

// Have a GET endpoint to retrieve a specific song based off its “id” property.
app.get("/api/songs/:id", (req, res) => {
  const id = req.params.id;
  const song = repoContext.songs.findSongById(id);
  return res.send(song);
});

// Have a POST endpoint, so I can add a new song to the data set.
// Have middleware validation for my POST endpoint to ensure data integrity.
app.post("/api/songs", [validateProduct], (req, res) => {
  const newSong = req.body;
  const addedSong = repoContext.songs.createSong(newSong);
  return res.send(addedSong);
});

// Add a PUT endpoint to enable update CRUD functionality.
// Have middleware validation for my PUT endpoint to ensure data integrity.
app.put("/api/songs/:id", [validateProduct], (req, res) => {
  const id = req.params.id;
  const songPropertiesToUpdate = req.body;
  const updateSong = repoContext.songs.updateSong(id, songPropertiesToUpdate);
  return res.send(updateSong);
});
// Add a DELETE endpoint to enable delete CRUD functionality.
app.delete("/api/songs/:id", (req, res) => {
  const id = req.params.id;
  const updatedDataSet = repoContext.songs.deleteSong(id);
  return res.send(updatedDataSet);
});

/*

// TODO:Connect my completed API server to my React Music Library project.
*/
