//create a Node.js and Express.js backend server for my React Music Library Project.
const express = require("express");
const repoContext = require("./repository/repository-wrapper");

const app = express();
const listenPort = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.post("/api/songs", (req, res) => {
  const newSong = req.body;
  const addedSong = repoContext.songs.createSong(newSong);
  return res.send(addedSong);
});
//TODO:Have middleware validation for my POST endpoint to ensure data integrity.

// Add a PUT endpoint to enable update CRUD functionality.
app.put("/api/songs/:id", (req, res) => {
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

// TODO:Test my API endpoints using Postman and export my request collection for submission with the project.
// Follow backend API server best practices.
// TODO:Connect my completed API server to my React Music Library project.
*/
