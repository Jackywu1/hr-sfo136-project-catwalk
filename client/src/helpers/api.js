const axios = require('axios');

const api = axios.create({ baseURL: 'http://localhost:3000' });

module.exports = {
  getAllProducts: async (page = 1, count = 5) => {
    const response = await api.get(`/products?page=${page}&count=${count}`);
    return response;
  },
  getProductInfo: async (productId) => {
    const response = await api.get(`/products/${productId}`)
    return response;
  },
  getProductStyles: async (productId) => {
    const response = await api.get(`/products/${productId}/styles`)
    return response;
  },
  getRelatedProducts: async (productId) => {
    const response = await pi.get(`/products/${productId}/related`)
    return response;
  },
  getReviews: async (productId, sort = 'helpful', page = 1, count = 5) => {
    const response = await api.get(`/reviews/?product_id=${productId}&sort=${sort}&page=${page}&count=${count}`)
    return response;
  },
  getReviewsMeta: async (productId) => {
    const response = await api.get(`/reviews/meta/?product_id=${productId}`)
    return response;
  },
  postReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData)
    return response;
  },
  markReviewHelpful: async (reviewId) => {
    const response = await api.put(`/reviews/${reviewId}/helpful`)
    return response;
  },
  reportReview: async (reviewId) => {
    const response = await api.put(`/reviews/${reviewId}/report`)
    return response;
  },
  getQuestions: async (productId, page = 1, count = 5) => {
    const response = await api.get(`/qa/questions/?product_id=${productId}&page=${page}&count=${count}`)
    return response;
  },
  getAnswers: async (questionId) => {
    const response = await api.get(`/qa/questions/${questionId}/answers`)
    return response;
  },
  postQuestion: async (questionData) => {
    const response = await api.post('/qa/questions', questionData)
    return response;
  },
  postAnswer: async (questionId) => {
    const response = await api.post(`/qa/questions${questionId}/answers`)
    return response;
  },
  markQuestionHelpful: async (questionId) => {
    const response = await api.put(`/qa/questions/${questionId}/helpful`)
    return response;
  },
  reportQuestion: async (questionId) => {
    const response = await api.put(`/qa/questions/${questionId}/report`)
    return response;
  },
  markAnswerHelpful: async (answerId) => {
    const response = await api.put(`/qa/answers/${answerId}/helpful`)
    return response;
  },
  reportAnswer: async (answerId) => {
    const response = await api.put(`/qa/answers/${answerId}/report`)
    return response;
  },
  getCart: async () => {
    const response = await api.get('/cart')
    return response;
  },
  addToCart: async (skuId) => {
    const response = await api.post('/cart', skuId)
    return response;
  },
  logInteraction: async (interaction) => {
    const response = await api.post('/interactions', interaction)
    return response;
  },
};
