const axios = require('axios');
require('dotenv').config();

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';
const headers = {
  'User-Agent': 'request',
  Authorization: process.env.GITHUB_AUTH_TOKEN,
};
const atelier = axios.create({ baseURL, headers });

module.exports = atelier;
