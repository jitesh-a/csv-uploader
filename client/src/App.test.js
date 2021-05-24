import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  const component = render(<App />);
  const linkElement = screen.getByText(/Welcome to CSV Uploader./i);
  expect(linkElement).toBeInTheDocument();
});
