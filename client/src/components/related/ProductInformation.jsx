import React, {
  lazy,
  Suspense,
  useContext,
} from 'react';
import styled from 'styled-components';
import { api } from 'helpers';
import { AppContext, CardContext } from '../Contexts';

const LazyImage = lazy(() => import('./LazyImage'));
const StarRating = lazy(() => import('../shared/StarRating'));

const StyledProductInformation = styled.div`
  position: relative;

  .product-preview { }

  .category { }

  .product-name { }

  .price { }

  .old-price {
    text-decoration: line-through;
  }

  .sale-price {
    color: red;
  }
`;

export default function ProductInformation() {
  const { appContext: app, setAppContext: setApp } = useContext(AppContext);
  const { cardContext: card } = useContext(CardContext);

  function loadNewProduct() {
    if (card.id !== app.productInfo.id) {
      window.scrollTo(0, 0);
      Array.from(document.getElementsByClassName('product-list'))
        .forEach((list) => list.scrollTo(0, 0));

      api.getRelatedProducts(card.id)
        .then(({ data }) => {
          setApp({
            ...app,
            productInfo: card.productInfo,
            productStyles: card.productStyles,
            relatedProducts: data,
            reviewsMeta: card.reviewsMeta,
          });
        })
        .catch((error) => console.error(error));
    }
  }

  if (card.productInfo && card.productStyles) {
    const defaultStyle = card.productStyles.results.find((style) => style['default?'] === true)
      || card.productStyles.results[0];
    const url = defaultStyle.photos[0].thumbnail_url || '';
    const name = defaultStyle.name || 'No style name provided';

    return (
      <Suspense fallback={<div />}>
        <StyledProductInformation className="product-info" onClick={() => loadNewProduct()}>
          <LazyImage className="product-preview" src={url} alt={name} />
          <div className="category">{card.productInfo.category}</div>
          <div className="product-name">{card.productInfo.name}</div>

          {defaultStyle && defaultStyle.sale_price
            && (
              <div>
                <span className="price old-price">{`$${defaultStyle.original_price}`}</span>
                &nbsp;
                <span className="price sale-price">{`$${defaultStyle.sale_price}`}</span>
              </div>
            )}

          {defaultStyle && !defaultStyle.sale_price
            && <div className="price">{`$${defaultStyle.original_price}`}</div>}

          {!defaultStyle
            && <div className="price">{`$${card.productInfo.default_price}`}</div>}

          <StarRating />
        </StyledProductInformation>
      </Suspense>
    );
  }
  return <div />;
}
