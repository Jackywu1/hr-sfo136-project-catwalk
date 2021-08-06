import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { AppContext, CardContext } from '../Contexts';

const StyledActionButton = styled.div`
  color: var(--color);
  cursor: pointer;
  font-family: Times;
  font-size: 2rem;
  left: 267px;
  line-height: 1.5rem;
  position: absolute;
  text-shadow: 0 0 8px black;
  top: 5px;
  z-index: 1000;
`;

export default function ActionButton() {
  const { appContext: app, setAppContext: setApp } = useContext(AppContext);
  const { cardContext: card } = useContext(CardContext);

  const icon = (card.cardType === 'related-product') ? '★' : '✖';
  const color = (card.cardType === 'related-product') ? 'gold' : 'red';

  const cardAction = useCallback(() => {
    if (card.cardType === 'outfit-product') {
      const currOutfit = Array.from(app.userOutfit);
      const index = currOutfit.findIndex((product) => product.id === card.id);

      if (index !== -1) { currOutfit.splice(index, 1); }

      window.localStorage.removeItem('userOutfit');
      window.localStorage.setItem('userOutfit', JSON.stringify(currOutfit));
      setApp({ ...app, userOutfit: currOutfit });
    }
  }, [app, card.cardType, card.id, setApp]);

  return (
    <StyledActionButton
      data-testid="ActionButton"
      className="action-button"
      style={{ '--color': color }}
      onClick={cardAction}
    >
      {icon}
    </StyledActionButton>
  );
}
