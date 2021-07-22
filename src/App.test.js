import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title header element', () => {
  render(<App />);
  const titleElement = screen.getByText(/Front-end capstone project for Hack Reactor/i);
  expect(titleElement).toBeInTheDocument();
});
