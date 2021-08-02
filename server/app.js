const express = require('express');
const cors = require('cors');
const path = require('path');
const atelier = require('./atelier');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use((req, res) => {
  atelier[req.method.toLowerCase()](req.originalUrl, req.body)
    .then((response) => res.status(response.status).send(response.data))
    .catch((error) => (
      (error.response && error.message)
        ? res.status(error.response.status).send(error.message)
        : res.status(500).send(error)
    ));
});

module.exports = app;
