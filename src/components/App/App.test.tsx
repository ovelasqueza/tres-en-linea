import { beforeEach, describe, expect, test } from 'vitest';
import { render, RenderResult } from '@testing-library/react';
import App from './App.tsx';

describe('App', () => {
  let component: RenderResult;
  beforeEach(() => {
    component = render(<App />);
  });

  test('should be render', () => {
    expect(component).toBeTruthy();
  });

  test('should be render welcome and description texts', () => {
    const welcome = component.queryByText('Bienvenido');
    const description = component.queryByTestId('description');

    expect(welcome).toBeInTheDocument();
    expect(description).toHaveTextContent('Vite + React + Tailwindcss + TS');
  });
});
