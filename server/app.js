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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b06262c9e23248afa35f011204059f8bafaa6dd4
    .catch((error) => (
      (error.response && error.message)
        ? res.status(error.response.status).send(error.message)
        : res.status(500).send(error)
    ));
<<<<<<< HEAD
=======
    .catch((error) => res.status(error.response.status).send(error.message));
>>>>>>> parent of 8f4f1a1 (Integrate the Overview code)
=======
>>>>>>> b06262c9e23248afa35f011204059f8bafaa6dd4
});

module.exports = app;
