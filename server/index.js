/* eslint-disable no-console */
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

app.use((req, res) => {
  atelier[req.method.toLowerCase()](req.originalUrl, req.body)
    .then((response) => res.status(response.status).send(response.data))
    .catch((error) => res.status(error.response.status).send(error.message));
});

app.listen(port, () => {
  console.log(`Project Catwalk listening on http://localhost:${port}`);
});
