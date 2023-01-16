const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.get("/lover", (req, res, next) => {
  res.sendFile(path.join(__dirname, "assets", "lover.mp4"));
})

app.get("/vedLavly", (req, res, next) => {
  res.sendFile(path.join(__dirname, "assets", "vedLavly.mp4"));
})

app.listen(8080, () => {
  console.log("Backend Server Started!");
});
