import React from 'react';
import { cleanup, render } from '@testing-library/react';
import StarRating from '../StarRating';

afterEach(cleanup);

describe('StarRating', () => {
  it('renders the component', () => {
    const { container } = render(<StarRating color="black" rating={3.8} size="3em" />);
    expect(container.querySelector('.StarsOuter')).toBeInTheDocument();
    expect(container.querySelector('.StarsInner')).toBeInTheDocument();
  });
});
