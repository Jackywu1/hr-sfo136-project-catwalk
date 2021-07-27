import PropTypes from 'prop-types';
import React from 'react';
import { math } from '../../helpers';
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
  const normalizedRating = math.normalizeRating(rating);
  return (
    <StarsOuter className="StarsOuter" style={{ '--size': size, '--color': color }}>
      <StarsInner className="StarsInner" style={{ '--rating': normalizedRating }} />
    </StarsOuter>
  );
}

StarRating.propTypes = {
  color: PropTypes.string,
  rating: PropTypes.number.isRequired,
  size: PropTypes.string,
};

StarRating.defaultProps = {
  color: 'black',
  size: '1rem',
}
