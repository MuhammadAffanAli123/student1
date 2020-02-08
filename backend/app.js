const path = require('path'); // match OS folders
const express = require('express');
const bodyParser = require('body-parser');

const postsRoutes = require('./routes/posts');
const downloadsRoutes = require('./routes/downloads');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
app.use("/files", express.static(path.join('backend/files'))); // give access to the files folder
app.use("/", express.static(path.join(__dirname, 'angular')));


app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use("/api/convert", postsRoutes);
app.use("/api/download", downloadsRoutes);
app.use((req, res, next) => res.sendFile(path.join(__dirname, "angular", "index.html")));

module.exports = app;
