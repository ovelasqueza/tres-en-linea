import { BoardType } from '../../components/App/App.tsx';

export const saveGameToStorage = ({
  board,
  turn,
}: {
  board: BoardType;
  turn: string;
}) => {
  // guardar aqui partida
  window.localStorage.setItem('board', JSON.stringify(board));
  window.localStorage.setItem('turn', turn);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
};

export const getBoardStorage = () => {
  const boardJSON = window.localStorage.getItem('board');
  return boardJSON ? JSON.parse(boardJSON) : null;
};

export const getTurnStorage = () => {
  return window.localStorage.getItem('turn');
};
