import React from 'react';
import { cleanup, render } from '@testing-library/react';
import StarRating from '../StarRating';

afterEach(cleanup);

describe('StarRating', () => {
  it('renders the component', () => {
    const { container } = render(<StarRating color="black" rating={3.8} size="3em" />);
    expect(container.getElementsByClassName('StarsOuter').length).toBe(1);
    expect(container.getElementsByClassName('StarsInner').length).toBe(1);
  });
});
