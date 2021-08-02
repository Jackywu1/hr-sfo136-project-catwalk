const axios = require('axios');
const rax = require('retry-axios');
require('dotenv').config();

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';

const headers = {
  'User-Agent': 'request',
  Authorization: process.env.GITHUB_AUTH_TOKEN,
};

const atelier = axios.create({ baseURL, headers, timeout: 500 });

atelier.defaults.raxConfig = { instance: atelier };

rax.attach(atelier);

module.exports = atelier;
