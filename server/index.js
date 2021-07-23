/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const axios = require('axios');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;
const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';
const headers = {
  'User-Agent': 'request',
  Authorization: process.env.GITHUB_AUTH_TOKEN,
};
const atelier = axios.create({ baseURL, headers });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use((req, res, next) => {
  atelier[req.method.toLowerCase()](req.originalUrl, req.body)
    .then((response) => next({ error: null, response }))
    .catch((error) => next({ error, response: null }));
});

app.use(({ error, response }, req, res, next) => {
  if (error) {
    res.status(error.response.status).send(error.message);
  } else {
    res.status(response.status).send(response.data);
  }
});

app.listen(port, () => {
  console.log(`Project Catwalk listening on http://localhost:${port}`);
});
