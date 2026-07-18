import { BOARD_SIZE } from '../utils/constants';
import { solveDeterministic, solve } from './solver';

export function generatePuzzle(emptyCells) {
  const board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(0)
  );

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      board[r][c] = 0;
    }
  }

  solve(board);
  const solution = board.map((row) => [...row]);

  const positions = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      positions.push([r, c]);
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  let removed = 0;
  for (const [r, c] of positions) {
    if (removed >= emptyCells) break;
    board[r][c] = 0;
    removed++;
  }

  return { puzzle: board, solution };
}
