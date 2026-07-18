import './NumberPad.css';

export default function NumberPad({ onNumberClick, onErase, counts }) {
  return (
    <div className="numpad">
      <button className="numpad__btn numpad__btn--erase" onClick={onErase}>
        Borrar
      </button>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <button
          key={n}
          className={`numpad__btn ${counts && counts[n] >= 9 ? 'numpad__btn--used' : ''}`}
          onClick={() => onNumberClick(n)}
          disabled={counts && counts[n] >= 9}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
