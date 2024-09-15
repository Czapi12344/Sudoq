import React, { useState, useEffect } from "react";

type Props = {
  board: (string | null)[][];
  solution: (string | null)[][] | null; // Solution for the puzzle
  onWin: (finalScore: number) => void; // Callback function to signal win condition
  difficulty: string; // Difficulty to calculate points
};

const SudokuBoard: React.FC<Props> = ({
  board,
  solution,
  onWin,
  difficulty,
}) => {
  const [currentBoard, setCurrentBoard] = useState<(string | null)[][]>(board);
  const [initialBoard, setInitialBoard] = useState<(string | null)[][]>(board);
  const [score, setScore] = useState(0);

  // Update the board when a new game starts
  useEffect(() => {
    setCurrentBoard(board);
    setInitialBoard(board);
  }, [board]);

  // Function to calculate points based on difficulty
  const getPoints = (isCorrect: boolean) => {
    let basePoints =
      difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;
    return isCorrect ? basePoints : -10; // Deduct 10 points for incorrect entries
  };

  // Function to handle user input in editable cells
  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    if (/^[1-9]?$/.test(value)) {
      const newBoard = currentBoard.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? value : cell
        )
      );

      // Update the score
      const isCorrect = solution && solution[rowIndex][colIndex] === value;
      setScore((prevScore) => prevScore + getPoints(isCorrect));

      setCurrentBoard(newBoard);

      // Check if the game is won
      checkWin(newBoard);
    }
  };

  // Function to check if the board is correctly filled
  const checkWin = (board: (string | null)[][]) => {
    // Check if all cells are filled correctly
    const isWin = board.every((row, rIdx) =>
      row.every((cell, cIdx) => cell === solution?.[rIdx][cIdx])
    );

    if (isWin) {
      onWin(score); // Call the onWin function with the final score
    }
  };

  // Function to check if the number entered by the user is correct
  const isCorrectNumber = (
    value: string | null,
    rowIndex: number,
    colIndex: number
  ) => {
    if (!solution || !value) return false;
    const correctSolution = solution[rowIndex]?.[colIndex];

    return value === String(correctSolution);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <table className="border-collapse border-2 border-gray-500 mx-auto">
        <tbody>
          {currentBoard.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const isThickRightBorder =
                  (colIndex + 1) % 3 === 0 && colIndex !== 8;
                const isThickBottomBorder =
                  (rowIndex + 1) % 3 === 0 && rowIndex !== 8;
                const borderClasses = `${
                  isThickRightBorder ? "border-r-2" : "border-r"
                } ${
                  isThickBottomBorder ? "border-b-2" : "border-b"
                } border-gray-500`;

                // Determine if the cell was initially empty
                const isEditableInitially =
                  initialBoard[rowIndex]?.[colIndex] === null;
                const value = currentBoard[rowIndex]?.[colIndex] || "";

                let cellStyle = "text-black bg-white";
                let isEditable = isEditableInitially;

                if (!isEditableInitially) {
                  // Non-editable cells (initial board cells)
                  cellStyle = "bg-gray-300 text-blue-600 font-bold";
                } else if (
                  value &&
                  !isCorrectNumber(value, rowIndex, colIndex)
                ) {
                  // If the number is incorrect, show in red
                  cellStyle = "bg-white text-red-600";
                } else if (
                  value &&
                  isCorrectNumber(value, rowIndex, colIndex)
                ) {
        
                  cellStyle = "bg-gray-300 text-blue-600 font-bold";
                  isEditable = false; 
                }

                return (
                  <td
                    key={colIndex}
                    className={`${borderClasses} w-12 h-12 p-0 m-0`}>
                    <input
                      type="text"
                      value={value}
                      className={`w-full h-full text-center text-lg focus:outline-none ${cellStyle}`}
                      maxLength={1}
                      onChange={(e) =>
                        handleChange(rowIndex, colIndex, e.target.value)
                      }
                      readOnly={!isEditable}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <span className="font-medium">Score:</span> {score}
      </div>
    </div>
  );
};

export default SudokuBoard;
