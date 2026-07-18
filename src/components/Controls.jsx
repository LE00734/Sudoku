import { DIFFICULTY } from '../utils/constants';
import './Controls.css';

export default function Controls({ difficulty, onNewGame, onSolve, onValidate }) {
  return (
    <div className="controls">
      <div className="controls__difficulty">
        {Object.entries(DIFFICULTY).map(([key, { label }]) => (
          <button
            key={key}
            className={`controls__diff-btn ${difficulty === key ? 'controls__diff-btn--active' : ''}`}
            onClick={() => onNewGame(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="controls__actions">
        <button className="controls__action-btn" onClick={onValidate}>
          Validar
        </button>
        <button className="controls__action-btn controls__action-btn--solve" onClick={onSolve}>
          Resolver
        </button>
      </div>
    </div>
  );
}
