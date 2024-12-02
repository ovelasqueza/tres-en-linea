import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { describe, test, expect, vi, beforeAll, beforeEach } from 'vitest';
import App from './App.tsx';
import { TURNS } from '../../constants';
// Mocking canvas-confetti

vi.mock('../../logic/storage', () => ({
  saveGameToStorage: vi.fn(),
  resetGameStorage: vi.fn(),
}));

const confettiMock = vi.hoisted(() => vi.fn());
vi.mock('canvas-confetti', () => {
  return {
    default: confettiMock,
  };
});

const checkWinnerFromMock = vi.hoisted(() => vi.fn());
const checkEndGameMock = vi.hoisted(() => vi.fn());
vi.mock('../../logic/board.ts', () => ({
  checkWinnerFrom: checkWinnerFromMock,
  checkEndGame: checkEndGameMock,
}));

vi.mock('../../logic/board.ts', () => {
  return {
    checkWinnerFrom: checkWinnerFromMock,
    checkEndGame: checkEndGameMock,
  };
});
describe('App Component', () => {
  beforeAll(() => {
    checkWinnerFromMock.mockReturnValue(null);
    checkEndGameMock.mockReturnValue(false);
  });

  let component: RenderResult;
  beforeEach(() => {
    // Mocking localStorage
    vi.spyOn(window.localStorage, 'getItem').mockReturnValue(null);
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {});
    component = render(<App />);
  });

  afterAll(() => {
    //vi.restoreAllMocks(); // limpia los mocks
  });

  test('should render button reset game', () => {
    const resetButton = component.queryByText('Reset Juego');
    expect(resetButton).toBeInTheDocument();
  });

  test('renders 9 Squares in the board', () => {
    const renderSquares = component.queryAllByTestId('square-board');
    expect(renderSquares).toHaveLength(9);
  });

  test('renders 2 Squares for selected gamer', () => {
    const renderSquares = component.queryAllByTestId('square-select');
    expect(renderSquares).toHaveLength(2);
    expect(renderSquares[0].textContent).equals(TURNS.X);
    expect(renderSquares[1].textContent).equals(TURNS.O);
  });

  test('the board is empty when first render', () => {
    const renderSquares = component.queryAllByTestId('square-board');
    renderSquares.forEach((square) => {
      expect(square).toHaveTextContent('');
    });
  });

  test('update square text when toggle gamer', async () => {
    const renderSquares = component.queryAllByTestId('square-board');

    fireEvent.click(renderSquares[0]);
    fireEvent.click(renderSquares[1]);

    expect(renderSquares[0].textContent).equals(TURNS.X);
    expect(renderSquares[1].textContent).equals(TURNS.O);
  });

  test('No overwrite the board', () => {
    const renderSquares = component.queryAllByTestId('square-board');
    fireEvent.click(renderSquares[0]);
    expect(renderSquares[0].textContent).toBe(TURNS.X);

    fireEvent.click(renderSquares[0]);
    expect(renderSquares[0].textContent).toBe(TURNS.X);
  });

  test('check winner for X', () => {
    checkWinnerFromMock.mockReturnValue(TURNS.X);
    checkEndGameMock.mockReturnValue(false);
    let winnerModal = component.queryByTestId('winner-modal');
    expect(winnerModal).not.toBeInTheDocument();
    const renderSquares = component.queryAllByTestId('square-board');
    fireEvent.click(renderSquares[0]); // X
    fireEvent.click(renderSquares[3]); // O
    fireEvent.click(renderSquares[1]); // X
    fireEvent.click(renderSquares[4]); // O
    fireEvent.click(renderSquares[2]); // X
    winnerModal = component.queryByTestId('winner-modal');
    expect(winnerModal).toBeInTheDocument();
    expect(confettiMock).toBeCalledWith({
      angle: 180,
      decay: 0.4,
    });
  });

  test('Button Reset game', () => {
    const renderSquares = component.queryAllByTestId('square-board');
    fireEvent.click(renderSquares[0]);
    expect(renderSquares[0].textContent).toBe(TURNS.X);
    const resetButton = screen.getByText('Reset Juego');
    fireEvent.click(resetButton);
    renderSquares.forEach((square) => {
      expect(square.textContent).toBe('');
    });
  });

  test('empate', () => {
    checkWinnerFromMock.mockReturnValue(null);
    checkEndGameMock.mockReturnValue(true);

    render(<App />);
    const renderSquares = component.queryAllByTestId('square-board');
    fireEvent.click(renderSquares[0]); // X
    fireEvent.click(renderSquares[3]); // O
    fireEvent.click(renderSquares[1]); // X
    fireEvent.click(renderSquares[4]); // O
    fireEvent.click(renderSquares[2]); // X

    const tieMessage = screen.getByText('Empate');
    expect(tieMessage).toBeInTheDocument();
  });
});
