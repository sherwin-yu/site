import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main portfolio sections', () => {
  render(<App />);
  const heroName = screen.getByText(/Hi, I'm/i);
  expect(heroName).toBeInTheDocument();
});
