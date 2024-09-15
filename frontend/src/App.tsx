import React, { useState } from "react";
import PlayerStats from "./components/PlayerStats";
import SudokuBoard from "./components/SudokuBoard";
import Modal from "./components/Modal";
import WinModal from "./components/Winmodal";
import { useKeycloak } from "@react-keycloak/web";
import AuthCheck from "./components/AuthCheck";

function App() {
  const [puzzle, setPuzzle] = useState<(number | null)[][] | null>(null);
  const [solution, setSolution] = useState<(number | null)[][] | null>(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false); 
  const [time, setTime] = useState(0); 
  const [finalTime, setFinalTime] = useState<number | null>(null); 

  const { keycloak } = useKeycloak();

  const getPoints = (isCorrect: boolean) => {
    let points = 0;
    if (isCorrect) {
      points = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;
    } else {
      points = -10; 
    }
    return points;
  };

  const handleWin = async () => {
    setIsWon(true);
    setFinalTime(time); 

    try {
      const username = keycloak.tokenParsed?.preferred_username || "Anonymous";
      const response = await fetch("http://localhost:8000/submit-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          score,
          time,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit score");
      }
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const startNewGame = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/new-game/?difficulty=${difficulty}`
      );
      const data = await response.json();
      if (response.ok) {
        const board = JSON.parse(data.puzzle);
        const solutionBoard = JSON.parse(data.solution);
        setPuzzle(board);
        setSolution(solutionBoard);
        setScore(0); 
        setIsWon(false); 
        setTime(0); 
        setFinalTime(null); 
      } else {
        alert(data.detail || "Error starting new game");
      }
    } catch (error) {
      console.error("Error fetching new game:", error);
    }
  };

  const handleNewGameClick = () => {
    if (puzzle) {
      setShowModal(true);
    } else {
      startNewGame();
    }
  };

  const confirmNewGame = () => {
    setShowModal(false);
    startNewGame();
  };

  const cancelNewGame = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center flex justify-between">
        <h1 className="text-2xl font-bold">Online Sudoku</h1>
        {keycloak.authenticated && (
          <button
            onClick={() => keycloak.logout()}
            className="bg-red-600 text-white p-2 rounded">
            Logout
          </button>
        )}
      </header>
      <AuthCheck>
        <main className="flex flex-1">
          <aside className="w-1/4 bg-gray-100 p-4">
            <PlayerStats
              score={score}
              time={time}
              setTime={setTime}
              resetTime={isWon}
            />
          </aside>
          <section className="w-3/4 p-4">
            {puzzle ? (
              <SudokuBoard
                board={puzzle}
                solution={solution}
                getPoints={getPoints}
                setScore={setScore}
                handleWin={handleWin}
                isWon={isWon} 
              />
            ) : (
              <SudokuBoard
                board={[
                  [null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null],
                  [null, null, null, null, null, null, null, null, null],
            
                ]}
                solution={[]}
                getPoints={getPoints}
                setScore={setScore}
                handleWin={handleWin}
                isWon={isWon}
              />
            )}

            <div className="mt-8 flex flex-col items-center">
              <label htmlFor="difficulty" className="block mb-2">
                Select Difficulty
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="border p-2 mb-4">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <button
                onClick={handleNewGameClick}
                className="bg-blue-600 text-white p-2 rounded">
                Start New Game
              </button>
            </div>
          </section>
        </main>
        <footer className="bg-blue-600 text-white p-2 text-center">
          &copy; 2024 Sudoku Online
        </footer>

        {showModal && (
          <Modal onConfirm={confirmNewGame} onCancel={cancelNewGame}>
            <p>A game is already in progress. Do you want to restart?</p>
          </Modal>
        )}

       
        {isWon && finalTime !== null && (
          <WinModal score={score} time={finalTime} onNewGame={startNewGame} />
        )}
      </AuthCheck>
    </div>
  );
}

export default App;
