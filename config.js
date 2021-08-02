import axios from 'axios';
// Add a request interceptor

axios.interceptors.request.use(function (config) {
  const token = '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';
  config.headers.Authorization =  token;

  return config;
});