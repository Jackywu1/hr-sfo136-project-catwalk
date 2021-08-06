import React from 'react';
import styled from 'styled-components';

const StyledPaddles = styled.div`
  .paddle {
    background-color: transparent;
    border: none;
    font-family: Times;
    font-size: 3rem;
    height: 379px;
    position: absolute;
    top: 8px;
    width: 3rem;
  }
  
  .left-paddle {
    background-image: linear-gradient(to left, transparent, white);
    left: 0;
  }
  
  .right-paddle {
    background-image: linear-gradient(to right, transparent, white);
    right: 0;
  }
`;

export default function Paddles({ paddleViz, scroll }) {
  const { scrollLeft, scrollRight } = scroll;
  const { leftHidden, rightHidden } = paddleViz;

  return (
    <StyledPaddles>
      <button
        type="button"
        className="paddle left-paddle"
        style={{ display: leftHidden ? 'none' : 'initial' }}
        onClick={scrollLeft}
      >
        ❮
      </button>
      <button
        type="button"
        className="paddle right-paddle"
        style={{ display: rightHidden ? 'none' : 'initial' }}
        onClick={scrollRight}
      >
        ❯
      </button>
    </StyledPaddles>
  );
}
