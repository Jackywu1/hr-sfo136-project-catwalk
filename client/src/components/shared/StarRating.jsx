import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { math } from 'helpers';
import { CardContext } from '../Contexts';

const StarsOuter = styled.div`
  color: var(--color);
  display: inline-block;
  font-family: Times;
  font-size: var(--size);
  position: relative;
  
  ::before {
    content: '☆☆☆☆☆';
  }
`;

const StarsInner = styled.div`
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  white-space: nowrap;
  width: calc(var(--rating) / 5 * 100%);
  
  ::before {
    content: '★★★★★';
  }
`;

export default function StarRating({ color, size }) {
  const { cardContext: card } = useContext(CardContext);

  const averageRating = math.getAverageRating(card.reviewsMeta.ratings);
  const normalizedRating = math.normalizeRating(averageRating);

  return (
    <StarsOuter data-testid="StarsOuter" style={{ '--color': color, '--size': size }}>
      <StarsInner data-testid="StarsInner" style={{ '--rating': normalizedRating }} />
    </StarsOuter>
  );
}

StarRating.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

StarRating.defaultProps = {
  color: 'black',
  size: '1rem',
};
