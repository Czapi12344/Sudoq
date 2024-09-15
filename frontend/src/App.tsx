import React, { useState } from "react";
import PlayerStats from "./components/PlayerStats";
import SudokuBoard from "./components/SudokuBoard";
import Modal from "./components/Modal"; // Custom modal component

function App() {
  const [puzzle, setPuzzle] = useState<string[][] | null>(null); // Holds the current puzzle
  const [difficulty, setDifficulty] = useState("easy"); // Tracks the selected difficulty
  const [showModal, setShowModal] = useState(false); // Tracks whether the modal is open

  // Fetch a new Sudoku puzzle from the backend
  const startNewGame = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/new-game/?difficulty=${difficulty}`
      );
      const data = await response.json();
      if (response.ok) {
        const board = JSON.parse(data.puzzle); // Parse the JSON string
        setPuzzle(board); // Set the new puzzle and replace the current one
      } else {
        alert(data.detail || "Error starting new game");
      }
    } catch (error) {
      console.error("Error fetching new game:", error);
    }
  };

  // Function to restart the current game (reset user input)
  const restartCurrentGame = () => {
    if (puzzle) {
      setPuzzle([...puzzle]); // Reset the current puzzle (this will clear user input)
    }
  };

  // Handle clicking the "New Game" button
  const handleNewGameClick = () => {
    if (puzzle) {
      setShowModal(true); // Show modal if a game is already in progress
    } else {
      startNewGame(); // Start a new game directly if no game is in progress
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

      {/* Custom modal for confirmation */}
      {showModal && (
        <Modal onConfirm={confirmNewGame} onCancel={cancelNewGame}>
          <p>A game is already in progress. Do you want to restart?</p>
        </Modal>
      )}
    </div>
  );
}

export default App;
