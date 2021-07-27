import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import StarRating from '../StarRating';

afterEach(cleanup);

describe('StarRating', () => {
  it('renders StarRating component', () => {
    render(<StarRating rating={3.8} />);
    expect(screen.getByTestId('StarsOuter')).toBeInTheDocument();
    expect(screen.getByTestId('StarsInner')).toBeInTheDocument();
  });
});
