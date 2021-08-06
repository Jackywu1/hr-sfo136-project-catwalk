import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { api } from 'helpers';
import { AppContext } from './Contexts';

const ProductList = lazy(() => import('./related/ProductList'));

const randomId = Math.floor((Math.random() * (26177 - 25167 + 1))) + 25167;

const StyledApp = styled.div`
  margin: 0 15%;
`;

export default function App() {
  const [appContext, setAppContext] = useState({
    loading: true,
    productInfo: { id: null },
    productStyles: {},
    relatedProducts: [],
    reviewsMeta: {},
    userOutfit: JSON.parse(window.localStorage.getItem('userOutfit')) || [],
  });

  useEffect(() => {
    if (!appContext.loading) { setAppContext({ ...appContext, loading: true }); }

    Promise.all([
      api.getProductInfo(randomId),
      api.getProductStyles(randomId),
      api.getRelatedProducts(randomId),
      api.getReviewsMeta(randomId),
    ]).then((responses) => {
      setAppContext({
        ...appContext,
        loading: false,
        productInfo: responses[0].data,
        productStyles: responses[1].data,
        relatedProducts: responses[2].data,
        reviewsMeta: responses[3].data,
      });
    }).catch((error) => {
      setAppContext({ ...appContext, loading: true });
      console.error(error.message);
    });
  }, []);

  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      <Suspense fallback={<div />}>
        {appContext.loading ? <div /> : (
          <StyledApp data-testid="App">
            <ProductList
              cardType="related-product"
              items={appContext.relatedProducts}
              listId="related-products"
              listTitle="RELATED PRODUCTS"
              listWrapperId="related-products-wrapper"
            />
            <ProductList
              cardType="outfit-product"
              items={appContext.userOutfit}
              listId="user-outfit"
              listTitle="YOUR OUTFIT"
              listWrapperId="user-outfit-wrapper"
            />
          </StyledApp>
        )}
      </Suspense>
    </AppContext.Provider>
  );
}
