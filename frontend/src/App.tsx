import React, { useState } from "react";
import PlayerStats from "./components/PlayerStats";
import SudokuBoard from "./components/SudokuBoard";
import Modal from "./components/Modal";
import AuthCheck from "./components/AuthCheck"; // Import the AuthCheck component

function App() {
<<<<<<< HEAD
  const [puzzle, setPuzzle] = useState<string[][] | null>(null);
  const [solution, setSolution] = useState<string[][] | null>(null);
  const [difficulty, setDifficulty] = useState("easy");
  const [showModal, setShowModal] = useState(false);
=======
  const [puzzle, setPuzzle] = useState<string[][] | null>(null); // Holds the current puzzle
  const [difficulty, setDifficulty] = useState("easy"); // Tracks the selected difficulty
  const [showModal, setShowModal] = useState(false); // Tracks whether the modal is open
>>>>>>> parent of 68884dd (fix 2)

  const startNewGame = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/new-game/?difficulty=${difficulty}`
      );
      const data = await response.json();
      if (response.ok) {
<<<<<<< HEAD
        const board = JSON.parse(data.puzzle);
        const solutionBoard = JSON.parse(data.solution);
        setPuzzle(board);
        setSolution(solutionBoard);
=======
        const board = JSON.parse(data.puzzle); // Parse the JSON string
        setPuzzle(board); // Set the new puzzle and replace the current one
>>>>>>> parent of 68884dd (fix 2)
      } else {
        alert(data.detail || "Error starting new game");
      }
    } catch (error) {
      console.error("Error fetching new game:", error);
    }
  };

<<<<<<< HEAD
=======
  // Function to restart the current game (reset user input)
  const restartCurrentGame = () => {
    if (puzzle) {
      setPuzzle([...puzzle]); // Reset the current puzzle (this will clear user input)
    }
  };

  // Handle clicking the "New Game" button
>>>>>>> parent of 68884dd (fix 2)
  const handleNewGameClick = () => {
    if (puzzle) {
      setShowModal(true);
    } else {
      startNewGame();
    }
  };

  // Handle modal confirmation for starting a new game
  const confirmNewGame = () => {
    setShowModal(false);
    startNewGame(); // Proceed with starting a new game
  };

  // Handle modal cancellation
  const cancelNewGame = () => {
    setShowModal(false); // Close the modal without starting a new game
  };

  return (
<<<<<<< HEAD
    <AuthCheck>
      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Online Sudoku</h1>
        </header>
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
=======
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Online Sudoku</h1>
      </header>
      <main className="flex flex-1">
        <aside className="w-1/4 bg-gray-100 p-4">
          <PlayerStats />
          <div className="mt-4">
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
            {puzzle && (
              <button
                onClick={restartCurrentGame}
                className="bg-yellow-500 text-white p-2 rounded mt-4">
                Restart Current Game
              </button>
            )}
          </div>
        </aside>
        <section className="w-3/4 p-4">
          {puzzle ? (
            <SudokuBoard board={puzzle} />
          ) : (
            <p>No puzzle loaded. Start a new game!</p>
          )}
        </section>
      </main>
      <footer className="bg-blue-600 text-white p-2 text-center">
        &copy; 2024 Sudoku Online
      </footer>
>>>>>>> parent of 68884dd (fix 2)

        {showModal && (
          <Modal onConfirm={confirmNewGame} onCancel={cancelNewGame}>
            <p>A game is already in progress. Do you want to restart?</p>
          </Modal>
        )}
      </div>
    </AuthCheck>
  );
}

export default App;
