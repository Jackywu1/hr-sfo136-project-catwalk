<<<<<<< HEAD
import React, { lazy, Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import Overview from "./Overview/Overview.js";
import { api } from "helpers";
import { AppContext } from "./Contexts";
=======
import React, { useState, useEffect } from 'react';
import { api } from '../helpers';
>>>>>>> parent of 8f4f1a1 (Integrate the Overview code)

// const ProductList = lazy(() => import('./related/ProductList'));

const randomId = Math.floor(Math.random() * (26177 - 25167 + 1)) + 25167;

const StyledApp = styled.div`
  margin: 0 15%;
`;
export default function App() {
  const [appContext, setAppContext] = useState({
    loading: true,
    productId: randomId,
    userOutfit: [],
    productInfo: null,
    productStyles: null,
    relatedProducts: [],
    reviewsMeta: null,
  });

  useEffect(() => {
    if (!appContext.loading) {
      setAppContext({ ...appContext, loading: true });
    }

    Promise.all([
      api.getProductInfo(appContext.productId),
      api.getProductStyles(appContext.productId),
      api.getRelatedProducts(appContext.productId),
      api.getReviewsMeta(appContext.productId),
    ])
      .then((responses) => {
        setAppContext({
          ...appContext,
          loading: false,
          productInfo: responses[0].data,
          productStyles: responses[1].data,
          relatedProducts: responses[2].data,
          reviewsMeta: responses[3].data,
        });
      })
      .catch((error) => {
        setAppContext({ ...appContext, loading: true });
        console.error(error);
      });
  }, [appContext]);

  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      <Suspense fallback={<div />}>
        {appContext.loading ? (
          <div />
        ) : (
          <StyledApp data-testid="App">
            <ProductList
              items={appContext.relatedProducts}
              listWrapperId="related-products-wrapper"
              listId="related-products"
              listTitle="RELATED PRODUCTS"
              cardType="related-product"
            />
            <ProductList
              items={appContext.userOutfit}
              listWrapperId="user-outfit-wrapper"
              listId="user-outfit"
              listTitle="YOUR OUTFIT"
              cardType="outfit-product"
            />
          </StyledApp>
        )}
        <div className="App">
          <Overview />
        </div>
      </Suspense>
    </AppContext.Provider>
  );
}
