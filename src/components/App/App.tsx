import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

import { Square } from '../Square.tsx';
import { TURNS, BOARD_EMPTY } from '../../constants.ts';
import Tittle from '../../Tittle.tsx';
import { checkWinnerFrom, checkEndGame } from '../../logic/board.ts';
import { WinnerModal } from '../WinnerModal.tsx';
import { saveGameToStorage, resetGameStorage, getBoardStorage, getTurnStorage } from '../../logic/storage';

export declare type SymbolGamerType = string;
export declare type BoardType = SymbolGamerType[];
export declare type WinnerType = boolean | null | SymbolGamerType;

function App() {
  const [board, setBoard] = useState<BoardType>(() => getBoardStorage() ?? BOARD_EMPTY);
  const [turn, setTurn] = useState<string>(() => getTurnStorage() ?? TURNS.X);
  const [winner, setWinner] = useState<WinnerType>(null);

  useEffect(() => {
    console.log('winner es', winner);
    if (winner) {
      confetti({
        spread: 150,
        scalar: 2,
        particleCount: 200,
      });
    }
  }, [winner]);

  const resetGame = () => {
    setBoard(BOARD_EMPTY);
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const updateBoard = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board]; //TODO:averiguar ...board
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });
    const newWinner = checkWinnerFrom(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <>
      <Tittle />
      <main className='board'>
        <button onClick={resetGame}>Reset Juego</button>
        <section className='game'>
          {board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard} board={true}>
                {square}
              </Square>
            );
          })}
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </>
  );
}

export default App;
