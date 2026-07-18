import Cell from './Cell';
import './Board.css';

export default function Board({ board, fixedCells, errors, selectedCell, onCellClick }) {
  const cells = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const key = `${r}-${c}`;
      const classes = ['cell'];
      if (fixedCells.has(key)) classes.push('cell--fixed');
      else classes.push('cell--editable');
      if (errors.includes(key)) classes.push('cell--error');
      if (selectedCell && selectedCell[0] === r && selectedCell[1] === c) classes.push('cell--selected');
      if (c % 3 === 0 && c !== 0) classes.push('cell--border-left');
      if (r % 3 === 0 && r !== 0) classes.push('cell--border-top');

      cells.push(
        <button
          key={key}
          className={classes.join(' ')}
          onClick={() => onCellClick(r, c)}
          disabled={fixedCells.has(key)}
        >
          {board[r][c] !== 0 ? board[r][c] : ''}
        </button>
      );
    }
  }

  return <div className="board">{cells}</div>;
}
