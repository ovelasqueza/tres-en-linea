import { WINNER_COMBOS } from '../constants.ts';
import { BoardType } from '../components/App/App.tsx';

export const checkWinnerFrom = (boardToCheck: BoardType) => {
  //se revisa combinaciones ganadorass
  // y tambien para ver si X - O ganó
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // devuelve esto si no hay ganador
  return null;
};

export const checkEndGame = (newBoard: BoardType) => {
  // se revisa  si hay un empate
  // si no hay más espacios vacíos en el tablero
  return newBoard.every((square) => square !== null);
};

export default checkWinnerFrom;
