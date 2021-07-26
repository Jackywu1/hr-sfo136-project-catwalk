/* eslint-disable no-console */
const axios = require('axios');

const api = axios.create({ baseURL: 'http://localhost:3000' });

module.exports = {
  getAllProducts: (callback) => {
    api.get('/products')
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  getProductInfo: (productId, callback) => {
    api.get(`/products/${productId}`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  getProductStyles: (productId, callback) => {
    api.get(`/products/${productId}/styles`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  getRelatedProducts: (productId, callback) => {
    api.get(`/products/${productId}/related`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  getReviews: (productId, callback, page = '', count = '', sort = '') => {
    api.get(`/reviews/?product_id=${productId}&page=${page}&count=${count}&sort=${sort}`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  getReviewsMeta: (productId, callback) => {
    api.get(`/reviews/?product_id=${productId}`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  postReview: (reviewData, callback) => {
    api.post('/reviews', reviewData)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  markReviewHelpful: (reviewId, callback) => {
    api.put(`/reviews/${reviewId}/helpful`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  reportReview: (reviewId, callback) => {
    api.put(`/reviews/${reviewId}/report`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  getQuestions: (productId, callback, page = '', count = '') => {
    api.get(`/qa/questions/?product_id=${productId}&page=${page}&count=${count}`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  getAnswers: (questionId, callback) => {
    api.get(`/qa/questions/${questionId}/answers`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  postQuestion: (questionData, callback) => {
    api.post('/qa/questions', questionData)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  postAnswer: (questionId, callback) => {
    api.post(`/qa/questions${questionId}/answers`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  markQuestionHelpful: (questionId, callback) => {
    api.put(`/qa/questions/${questionId}/helpful`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  reportQuestion: (questionId, callback) => {
    api.put(`/qa/questions/${questionId}/report`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  markAnswerHelpful: (answerId, callback) => {
    api.put(`/qa/answers/${answerId}/helpful`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  reportAnswer: (answerId, callback) => {
    api.put(`/qa/answers/${answerId}/report`)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  getCart: (callback) => {
    api.get('/cart')
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  addToCart: (skuId, callback) => {
    api.post('/cart', skuId)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
  logInteraction: (interaction, callback) => {
    api.post('/interactions', interaction)
      .then((data) => callback(null, data))
      .catch((error) => callback(error));
  },
};
