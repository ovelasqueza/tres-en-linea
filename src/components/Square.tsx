import { ReactNode } from 'react';

declare type SquareProps = {
  children: ReactNode;
  isSelected?: boolean;
  updateBoard?: (i: number) => void;
  index?: number;
  board?: boolean;
};
export const Square = ({
  children,
  isSelected,
  updateBoard,
  index,
  board,
}: SquareProps) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () => {
    if (index != undefined && updateBoard) updateBoard(index);
  };
  //square
  return (
    <div
      onClick={handleClick}
      className={className}
      data-testid={board ? 'square-board' : 'square-select'}
    >
      {children}
    </div>
  );
};
