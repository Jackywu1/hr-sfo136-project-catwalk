import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

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

export default function StarRating({ color, rating, size }) {
  let normalizedRating = (Math.round(rating * 4) / 4).toFixed(2);
  normalizedRating += (normalizedRating % 1 === 0.25) ? 0.08 : 0;
  normalizedRating -= (normalizedRating % 1 === 0.75) ? 0.08 : 0;
  return (
    <StarsOuter className="StarsOuter" style={{ '--size': size, '--color': color }}>
      <StarsInner className="StarsInner" style={{ '--rating': normalizedRating }} />
    </StarsOuter>
  );
}

StarRating.propTypes = {
  color: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
};
