import { render, screen } from '@testing-library/react';
import App from './App';

// See https://github.com/testing-library/jest-dom

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login/);
  expect(linkElement).toBeInTheDocument();
});
