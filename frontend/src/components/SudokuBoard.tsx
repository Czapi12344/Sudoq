import React, { useState, useEffect } from "react";

type Props = {
<<<<<<< HEAD
  board: (string | null)[][]; 
  solution: (string | null)[][] | null;
=======
  board: (string | null)[][]; // Initial board from the generator
>>>>>>> parent of 68884dd (fix 2)
};

const SudokuBoard: React.FC<Props> = ({ board }) => {
  // Maintain the current board state to allow user input
  const [currentBoard, setCurrentBoard] = useState<(string | null)[][]>(board);
<<<<<<< HEAD
  const [initialBoard, setInitialBoard] = useState<(string | null)[][]>(board); 
=======
  const [initialBoard] = useState<(string | null)[][]>(board); // Keep a copy of the initial board
>>>>>>> parent of 68884dd (fix 2)

 
  useEffect(() => {
    setCurrentBoard(board);
    setInitialBoard(board);
  }, [board]);

  
  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    // Only allow numbers from 1 to 9
    if (/^[1-9]?$/.test(value)) {
<<<<<<< HEAD

=======
>>>>>>> parent of 68884dd (fix 2)
      const newBoard = currentBoard.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? value : cell
        )
      );
      setCurrentBoard(newBoard);
    }
  };

  
  const isCorrectNumber = (
    value: string,
    rowIndex: number,
    colIndex: number
  ) => {
<<<<<<< HEAD
    if (!solution || !value) return false; 
    const correctSolution = solution[rowIndex]?.[colIndex];


    return value === String(correctSolution);
=======
    // In a real scenario, you would have the solution of the puzzle and check against it.
    // This is a simple placeholder for checking correctness (replace it with the actual solution check).
    // For demo purposes, let's assume the solution is a complete board where all numbers are correct.
    const correctSolution = initialBoard[rowIndex]?.[colIndex];
    return correctSolution === value;
>>>>>>> parent of 68884dd (fix 2)
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <table className="border-collapse border-2 border-gray-500 mx-auto">
        <tbody>
          {currentBoard.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                // Determine if this is a thick border cell for the 3x3 grid separation
                const isThickRightBorder =
                  (colIndex + 1) % 3 === 0 && colIndex !== 8;
                const isThickBottomBorder =
                  (rowIndex + 1) % 3 === 0 && rowIndex !== 8;
                const borderClasses = `${
                  isThickRightBorder ? "border-r-2" : "border-r"
                } ${
                  isThickBottomBorder ? "border-b-2" : "border-b"
                } border-gray-500`;

<<<<<<< HEAD

                const isEditableInitially =
                  initialBoard[rowIndex]?.[colIndex] === null;
                const value = currentBoard[rowIndex]?.[colIndex] || "";

                let cellStyle = "text-black bg-white"; 
                let isEditable = isEditableInitially;

                if (!isEditableInitially) {
              
=======
                // Pre-filled cells are read-only, empty cells are editable
                const isEditable = cell === null || cell === "";
                const value = currentBoard[rowIndex]?.[colIndex] || "";

                let cellStyle = "text-black bg-white"; // Default style for user input
                if (!isEditable) {
                  // Style for pre-filled cells by the generator
>>>>>>> parent of 68884dd (fix 2)
                  cellStyle = "bg-gray-300 text-blue-600 font-bold";
                } else if (
                  value &&
                  !isCorrectNumber(value, rowIndex, colIndex)
                ) {
<<<<<<< HEAD
          
=======
                  // If the number is incorrect, change the font to red
>>>>>>> parent of 68884dd (fix 2)
                  cellStyle = "bg-white text-red-600";
                } else if (
                  value &&
                  isCorrectNumber(value, rowIndex, colIndex)
                ) {
<<<<<<< HEAD
                
                  cellStyle = "bg-gray-300 text-blue-600 font-bold";
                  isEditable = false;
=======
                  // If the number is correct, change the font to blue and background to gray
                  cellStyle = "bg-gray-300 text-blue-600";
>>>>>>> parent of 68884dd (fix 2)
                }

                return (
                  <td
                    key={colIndex}
                    className={`${borderClasses} w-12 h-12 p-0 m-0`}>
                    <input
                      type="text"
                      value={isEditable ? value : cell || ""}
                      className={`w-full h-full text-center text-lg focus:outline-none ${cellStyle}`}
                      maxLength={1}
                      onChange={(e) =>
                        handleChange(rowIndex, colIndex, e.target.value)
                      }
                      readOnly={!isEditable} // Read-only for non-editable cells
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SudokuBoard;
