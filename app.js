const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res, next) => {
  res.send("Hello From Server");
});

app.get("/lover", (req, res, next) => {
  const range = req.headers.range;
  const videoPath = path.join(__dirname, "assets", "lover.mp4");
  const videoSize = fs.statSync(videoPath).size;
  console.log(range);
  if (!range) {
    const head = {
      "Content-Length": videoSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  } else {
    const parts = range.replace(/bytes=/, "").split("-");
    console.log(parts);
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
    const chunkSize = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  }
});

app.get("/vedLavly", (req, res, next) => {
  const range = req.headers.range;
  if (!range) {
    return res.status(400).send("Requires Range header");
  }
  res.sendFile(path.join(__dirname, "assets", "uuchai.mp4"));
});

app.listen(5000, () => {
  console.log("Backend Server Started!");
});
