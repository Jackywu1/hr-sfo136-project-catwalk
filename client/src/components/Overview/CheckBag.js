import React, { useState } from 'react';
import { BagDiv } from './styles/Container.style';

const CheckBag = () => {
  const [favorit, setFavorit] = useState(false);
  const [addToBag, setAddToBag] = useState(false);

  return (
    <BagDiv>
      <div
        style={{
          border: '1px solid green',
          padding: '10px 20px',
          marginRight: '20px',
        }}
      >
        {' '}
        ADD TO BAG{' '}
        <span
          onClick={() => setAddToBag(!addToBag)}
          style={{ marginLeft: '20px' }}
        >
          {addToBag ? '✓' : '+'}
        </span>
      </div>
      <div
        style={{ border: '1px solid green', padding: '6px 20px' }}
        onClick={() => setFavorit(!favorit)}
      >
        {favorit ? '★' : '☆'}
      </div>
    </BagDiv>
  );
  s;
};

export default CheckBag;