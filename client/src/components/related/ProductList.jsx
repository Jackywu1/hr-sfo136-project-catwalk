import React, {
  lazy,
  Suspense,
  useCallback,
  useState,
} from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const AddCard = lazy(() => import('./AddCard'));
const ProductCard = lazy(() => import('./ProductCard'));
const Paddles = lazy(() => import('./Paddles'));

const StyledProductList = styled.div`
  position: relative;
  height: 453px;
  margin: 1em auto;
  overflow: hidden;
  width: 100%;

  .list-title { }

  .product-list {
    box-sizing: border-box;
    height: 473px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
`;

export default function ProductList({
  cardType,
  items,
  listId,
  listTitle,
  listWrapperId,
}) {
  const [paddleViz, setPaddleViz] = useState({
    leftHidden: true,
    rightHidden: false,
  });

  const scrollLeft = useCallback(() => {
    const itemSize = $(`.${cardType}`).outerWidth(true);
    const listPosition = $(`#${listId}`).scrollLeft();
    const newPosition = listPosition - itemSize;

    $(`#${listId}`).animate({ scrollLeft: newPosition }, 300);
  }, []);

  const scrollRight = useCallback(() => {
    const itemSize = $(`.${cardType}`).outerWidth(true);
    const listPosition = $(`#${listId}`).scrollLeft();
    const newPosition = listPosition + itemSize;

    $(`#${listId}`).animate({ scrollLeft: newPosition }, 300);
  }, []);

  const changePaddles = useCallback(() => {
    const itemsLength = $(`.${cardType}`).length;
    const itemSize = $(`.${cardType}`).outerWidth(true);
    const listSize = itemsLength * itemSize;
    const listWrapperSize = $(`#${listWrapperId}`).outerWidth();
    const listInvisibleSize = listSize - listWrapperSize;
    const listPosition = $(`#${listId}`).scrollLeft();
    const listEndOffset = listInvisibleSize - 20;

    if ((listPosition <= 0) && (listPosition < listEndOffset)) {
      setPaddleViz({
        leftHidden: true,
        rightHidden: false,
      });
    } else if ((listPosition > 0) && (listPosition < listEndOffset)) {
      setPaddleViz({
        leftHidden: false,
        rightHidden: false,
      });
    } else if ((listPosition > 0) && (listPosition >= listEndOffset)) {
      setPaddleViz({
        leftHidden: false,
        rightHidden: true,
      });
    }
  }, []);

  return (
    <Suspense fallback={<div />}>
      <h3 className="list-title">{listTitle}</h3>
      <StyledProductList id={listWrapperId}>
        <div id={listId} className="product-list" onScroll={changePaddles}>

          {listId === 'user-outfit' ? <AddCard /> : null}

          {listId === 'user-outfit'
            ? items.map(({ id }) => (
              <ProductCard
                key={id}
                cardId={id}
                cardType={cardType}
                listId={listId}
              />
            ))
            : items.map((id) => (
              <ProductCard
                key={id}
                cardId={id}
                cardType={cardType}
                listId={listId}
              />
            ))}
        </div>
        <Paddles paddleViz={paddleViz} scroll={{ scrollLeft, scrollRight }} />
      </StyledProductList>
    </Suspense>
  );
}
