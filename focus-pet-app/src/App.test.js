import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Focus Pet start screen', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/focus pet/i);
  expect(brandElements[0]).toBeInTheDocument();
});
