import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../Contexts';

const StyledAddCard = styled.div`
  border: solid 1px black;
  box-sizing: border-box;
  display: inline-block;
  height: 379px;
  margin: 8px;
  position: relative;
  vertical-align: top;
  width: 302px;
`;

export default function AddCard() {
  const { appContext: app, setAppContext: setApp } = useContext(AppContext);

  const addOutfit = useCallback(() => {
    const currOutfit = Array.from(app.userOutfit);
    if (currOutfit.findIndex((product) => product.id === app.productInfo.id) === -1) {
      currOutfit.unshift({
        id: app.productInfo.id,
        productInfo: app.productInfo,
        productStyles: app.productStyles,
        reviewsMeta: app.reviewsMeta,
      });

      window.localStorage.removeItem('userOutfit');
      window.localStorage.setItem('userOutfit', JSON.stringify(currOutfit));
      setApp({ ...app, userOutfit: currOutfit });
    }
  }, [app, setApp]);

  return (
    <StyledAddCard className="outfit-product" onClick={addOutfit}>
      <div className="placeholder">
        <div className="icon">+</div>
        <div className="card-title">Add to Outfit</div>
      </div>
    </StyledAddCard>
  );
}
