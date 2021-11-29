import styled from "styled-components";
import BoardPage from "./Board";
import { useLocalStorageState } from "./utils";

const Main = styled.div`
  .game {
    font: 14px "Century Gothic", Futura, sans-serif;
    margin: 20px;
    min-height: 260px;
  }

  .game ol,
  .game ul {
    padding-left: 30px;
  }

  .game-info {
    margin-left: 20px;
    min-width: 190px;
  }
`;

const Center = styled.div`
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .restart {
    margin-top: 10px;
  }
`;

const Game = () => {
  const [history, setHistory] = useLocalStorageState("tic-tac-toe:history", [
    Array(9).fill(null),
  ]);
  const [currentStep, setCurrentStep] = useLocalStorageState(
    "tic-tac-toe:step",
    0
  );

  const currentSquares = history[currentStep];
  const winner = calculateWinner(currentSquares);
  const nextValue = calculateNextValue(currentSquares);
  const status = calculateStatus(winner, currentSquares, nextValue);

  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return;
    }

    const newHistory = history.slice(0, currentStep + 1);
    const squares = [...currentSquares];

    squares[square] = nextValue;
    setHistory([...newHistory, squares]);
    setCurrentStep(newHistory.length);
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  const moves = history.map((stepSquares, step) => {
    const desc = step ? `Go to move #${step}` : "Go to game start";
    const isCurrentStep = step === currentStep;
    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
          {desc} {isCurrentStep ? "(current)" : null}
        </button>
      </li>
    );
  });

  function calculateStatus(winner, squares, nextValue) {
    return winner
      ? `Winner: ${winner}`
      : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
  }

  function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <Main className="game">
      <Center className="game-board">
        <BoardPage onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </Center>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </Main>
  );
};

export default Game;
