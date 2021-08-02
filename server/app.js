const express = require('express');
const path = require('path');
const atelier = require('./atelier');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use((req, res) => {
  atelier[req.method.toLowerCase()](req.originalUrl, req.body)
    .then((response) => res.status(response.status).send(response.data))
    .catch(() => res.status(400));
});

module.exports = app;
