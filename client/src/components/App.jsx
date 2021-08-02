import React, { useState, useEffect } from 'react';
import Overview from './Overview/Overview.js'
import { api } from '../helpers';

export default function App() {
  const [product, setProduct] = useState({});
  const [productInfo, setProductInfo] = useState({});
  const [reviews, setReviews] = useState({});
  const [reviewsMeta, setReviewsMeta] = useState({});

  useEffect(() => {
    api.getAllProducts()
      .then(({ data }) => setProduct(data[0]))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (product.id) {
      api.getProductInfo(product.id)
        .then(({ data }) => setProductInfo(data))
        .catch((error) => console.error(error));

      api.getReviews(product.id, 'newest')
        .then(({ data }) => setReviews(data))
        .catch((error) => console.error(error));

      api.getReviewsMeta(product.id)
        .then(({ data }) => setReviewsMeta(data))
        .catch((error) => console.error(error));
    }
  }, [product]);

  return (
    <div className="App">
      <Overview />
    </div>
  );
}
