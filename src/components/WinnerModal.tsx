import { Square } from './Square.tsx';
import { WinnerType } from './App/App.tsx';

declare type WinnerModalType = {
  winner: WinnerType;
  resetGame: () => void;
};

export function WinnerModal({ winner, resetGame }: WinnerModalType) {
  if (winner === null) return null;

  const winnerText = winner === false ? 'Empate' : 'Ganó:';

  return (
    <section className='winner' data-testid='winner-modal'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>{winner && <Square>{winner}</Square>}</header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
