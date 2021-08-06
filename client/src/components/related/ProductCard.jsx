import React, {
  lazy,
  Suspense,
  useContext,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { api } from 'helpers';
import { AppContext, CardContext } from '../Contexts';

const ActionButton = lazy(() => import('./ActionButton'));
const ProductInformation = lazy(() => import('./ProductInformation'));

const StyledProductCard = styled.div`
  border: solid 1px black;
  box-sizing: border-box;
  display: inline-block;
  height: 379px;
  margin: 8px;
  position: relative;
  vertical-align: top;
  width: 302px;
`;

export default function ProductCard({ cardId, cardType, listId }) {
  const { appContext: app } = useContext(AppContext);

  const [cardContext, setCardContext] = useState({
    loading: true,
    productInfo: null,
    productStyles: null,
    reviewsMeta: null,
    id: cardId,
    cardType,
    listId,
  });

  useEffect(() => {
    if (!cardContext.loading) { setCardContext({ ...cardContext, loading: true }); }

    if (cardId === app.productInfo.id) {
      setCardContext({
        ...cardContext,
        loading: false,
        productInfo: app.productInfo,
        productStyles: app.productStyles,
        reviewsMeta: app.reviewsMeta,
      });
    } else {
      Promise.all([
        api.getProductInfo(cardId),
        api.getProductStyles(cardId),
        api.getReviewsMeta(cardId),
      ]).then((responses) => {
        setCardContext({
          ...cardContext,
          loading: false,
          productInfo: responses[0].data,
          productStyles: responses[1].data,
          reviewsMeta: responses[2].data,
        });
      }).catch((error) => {
        setCardContext({ ...cardContext, loading: true });
        console.error(error.message);
      });
    }
  }, []);

  return (
    <CardContext.Provider value={{ cardContext, setCardContext }}>
      <Suspense fallback={<div />}>
        {cardContext.loading ? <div /> : (
          <StyledProductCard cardType={cardType} className={`product-card ${cardType}`}>
            <ActionButton />
            <ProductInformation />
          </StyledProductCard>
        )}
      </Suspense>
    </CardContext.Provider>
  );
}
