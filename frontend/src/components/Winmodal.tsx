// src/components/WinModal.tsx
import React from "react";

type WinModalProps = {
  score: number;
  time: number;
  onNewGame: () => void;
};

const WinModal: React.FC<WinModalProps> = ({ score, onNewGame }) => {



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg z-50">
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="mb-2">You've solved the Sudoku!</p>
        <p className="mb-2">Score: {score}</p>
       
        <button
          onClick={onNewGame}
          className="bg-blue-600 text-white p-2 rounded">
          Start New Game
        </button>
      </div>
    </div>
  );
};

export default WinModal;
