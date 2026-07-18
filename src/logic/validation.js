import { BOARD_SIZE, EMPTY } from '../utils/constants';

export function isBoardComplete(board) {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === EMPTY) return false;
    }
  }
  return true;
}

export function findErrors(board, solution) {
  const errors = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] !== EMPTY && board[row][col] !== solution[row][col]) {
        errors.push(`${row}-${col}`);
      }
    }
  }
  return errors;
}
