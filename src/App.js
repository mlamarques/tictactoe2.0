import { useEffect, useState } from 'react';
import './App.css';
import Tile from './components/Tile';
import Confetti from 'react-confetti';

function App() {
  const [tileValues, setTileValues] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [hasWinner, setHasWinner] = useState(false);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    const player = isPlayerOneTurn ? 'Player One' : 'Player Two';
    if (checkIfWins()) {
      console.log(`${player} wins!`);
      setHasWinner(true);
    }
    if (!tileValues.includes('')) {
      setIsDraw(true);
      setHasWinner(true);
    }
    setIsPlayerOneTurn((prev) => !prev);
  }, [tileValues]);

  async function handleClick(event, key) {
    if (tileValues[key] === '' && !hasWinner) {
      let newArr = [...tileValues];
      newArr[key] = isPlayerOneTurn ? playerOneSymbol : playerTwoSymbol;
      await new Promise((resolve) => {
        setTileValues(newArr);
        resolve();
      });
    }
  }

  function checkIfWins() {
    if (isPlayerOneTurn === true) {
      return winningConditions.some((combination) => {
        return combination.every((i) => {
          return tileValues[i] === 'X';
        });
      });
    }
    return winningConditions.some((combination) => {
      return combination.every((i) => {
        return tileValues[i] === 'O';
      });
    });
  }

  function restartGame() {
    setTileValues(['', '', '', '', '', '', '', '', '']);
    setHasWinner(false);
    setIsDraw(false);
    setIsPlayerOneTurn((prev) => !prev);
  }

  const tilesRendered = tileValues.map((item, key) => {
    return (
      <Tile
        key={`Tile${key + 1}`}
        id={key + 1}
        handleClick={(event) => handleClick(event, key)}
        value={tileValues[key]}
      />
    );
  });

  const playerOneSymbol = 'X';
  const playerTwoSymbol = 'O';
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return (
    <div className="App">
      {hasWinner ? (
        <div className="winner-container">
          {isDraw ? (
            <div className="winner">It's a draw</div>
          ) : (
            <div className="winner">
              <Confetti />
              {!isPlayerOneTurn ? 'Player One' : 'Player Two'} wins!
            </div>
          )}
          <div className="btn-container">
            <button className="btn" onClick={restartGame}>
              Restart
            </button>
          </div>
        </div>
      ) : (
        <div className="board-container">
          <div className="player">
            <div className="player-wrapper">
              {isPlayerOneTurn ? 'Player 1 turn' : 'Player 2 turn'}
              <div className="player-symbol">{isPlayerOneTurn ? 'X' : 'O'}</div>
            </div>
          </div>
          <div className="board-wrapper">
            <div className="board">{tilesRendered}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
