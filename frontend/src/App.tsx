import React, { useState } from "react";
import PlayerStats from "./components/PlayerStats";
import SudokuBoard from "./components/SudokuBoard";
import Modal from "./components/Modal";
import { useKeycloak } from "@react-keycloak/web"; // Import useKeycloak for logout
import AuthCheck from "./components/AuthCheck"; 

function App() {
  const [puzzle, setPuzzle] = useState<string[][] | null>(null);
  const [solution, setSolution] = useState<string[][] | null>(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [showModal, setShowModal] = useState(false);

  const { keycloak } = useKeycloak(); // Access the keycloak instance

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
            <PlayerStats />
          </aside>
          <section className="w-3/4 p-4">
            {puzzle ? (
              <SudokuBoard board={puzzle} solution={solution} />
            ) : (
              <SudokuBoard
                board={JSON.parse(
                  "[[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null]]"
                )}
                solution={[]}
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
    </AuthCheck>
    </div>
    
  );
}

export default App;
