import { useState, useCallback, useEffect, useRef } from 'react';
import Board from './components/Board';
import NumberPad from './components/NumberPad';
import Controls from './components/Controls';
import { generatePuzzle } from './logic/generator';
import { findErrors, isBoardComplete } from './logic/validation';
import { BOARD_SIZE, DIFFICULTY } from './utils/constants';
import './App.css';

function buildFixedCells(puzzle) {
  const fixed = new Set();
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (puzzle[r][c] !== 0) {
        fixed.add(`${r}-${c}`);
      }
    }
  }
  return fixed;
}

function countNumbers(board) {
  const counts = {};
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const v = board[r][c];
      if (v !== 0) counts[v] = (counts[v] || 0) + 1;
    }
  }
  return counts;
}

function createGame(diffKey) {
  const { puzzle, solution } = generatePuzzle(DIFFICULTY[diffKey].emptyCells);
  return {
    board: puzzle.map((r) => [...r]),
    solution,
    fixedCells: buildFixedCells(puzzle),
  };
}

export default function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const gameRef = useRef(null);

  if (!gameRef.current) {
    gameRef.current = createGame('easy');
  }

  const [board, setBoard] = useState(() => gameRef.current.board);
  const [solution, setSolution] = useState(() => gameRef.current.solution);
  const [fixedCells, setFixedCells] = useState(() => gameRef.current.fixedCells);
  const [selectedCell, setSelectedCell] = useState(null);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');

  const newGame = useCallback((diff) => {
    const d = diff || 'easy';
    try {
      const game = createGame(d);
      gameRef.current = game;
      setDifficulty(d);
      setBoard(game.board);
      setSolution(game.solution);
      setFixedCells(game.fixedCells);
      setSelectedCell(null);
      setErrors([]);
      setMessage('');
    } catch (err) {
      console.error('Error generating puzzle:', err);
      setMessage('Error al generar el puzzle. Intenta de nuevo.');
    }
  }, []);

  const handleCellClick = useCallback((r, c) => {
    setSelectedCell([r, c]);
    setErrors([]);
    setMessage('');
  }, []);

  const handleNumberClick = useCallback(
    (num) => {
      if (!selectedCell) return;
      const [r, c] = selectedCell;
      const key = `${r}-${c}`;
      if (fixedCells.has(key)) return;

      setBoard((prev) => {
        const next = prev.map((row) => [...row]);
        next[r][c] = num;
        return next;
      });
    },
    [selectedCell, fixedCells]
  );

  const handleErase = useCallback(() => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    const key = `${r}-${c}`;
    if (fixedCells.has(key)) return;

    setBoard((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = 0;
      return next;
    });
  }, [selectedCell, fixedCells]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key >= '1' && e.key <= '9') {
        handleNumberClick(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleErase();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleNumberClick, handleErase]);

  const handleValidate = useCallback(() => {
    const errs = findErrors(board, solution);
    setErrors(errs);
    if (errs.length === 0 && isBoardComplete(board)) {
      setMessage('Felicidades! Completaste el Sudoku correctamente!');
    } else if (errs.length === 0 && !isBoardComplete(board)) {
      setMessage('Todo correcto hasta ahora, sigue asi!');
    } else {
      setMessage(`Hay ${errs.length} error(es) en el tablero.`);
    }
  }, [board, solution]);

  const handleSolve = useCallback(() => {
    const solved = solution.map((r) => [...r]);
    setBoard(solved);
    setErrors([]);
    setMessage('Sudoku resuelto.');
  }, [solution]);

  const numCounts = countNumbers(board);

  return (
    <div className="app">
      <h1 className="app__title">Sudoku</h1>
      <Controls
        difficulty={difficulty}
        onNewGame={newGame}
        onSolve={handleSolve}
        onValidate={handleValidate}
      />
      <div className="app__board-wrapper">
        <Board
          board={board}
          fixedCells={fixedCells}
          errors={errors}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
        />
      </div>
      <NumberPad
        onNumberClick={handleNumberClick}
        onErase={handleErase}
        counts={numCounts}
      />
      {message && <p className="app__message">{message}</p>}
    </div>
  );
}
