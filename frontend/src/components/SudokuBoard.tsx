import React, { useState, useEffect } from "react";

type Props = {
  board: (number | null)[][];
  solution: (number | null)[][] | null;
  getPoints: (isCorrect: boolean) => number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  handleWin: () => void;
  isWon: boolean;
};

const SudokuBoard: React.FC<Props> = ({
  board,
  solution,
  getPoints,
  setScore,
  handleWin,
  isWon,
}) => {
  const [currentBoard, setCurrentBoard] = useState<(number | null)[][]>(board);
  const [initialBoard, setInitialBoard] = useState<(number | null)[][]>(board);

  useEffect(() => {
    setCurrentBoard(board);
    setInitialBoard(board);
  }, [board]);

  const handleChange = (rowIndex: number, colIndex: number, value: string) => {

    const parsedValue = value === "" ? null : parseInt(value, 10);
    if (parsedValue === null || (parsedValue >= 1 && parsedValue <= 9)) {
      const newBoard = currentBoard.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? parsedValue : cell
        )
      );

      if (solution) {
        const isCorrect = parsedValue === solution[rowIndex][colIndex];
        setScore((prevScore) => prevScore + getPoints(isCorrect));
      }

      setCurrentBoard(newBoard);

      checkWin(newBoard);
    }
  };

  const checkWin = (board: (number | null)[][]) => {
    if (!solution) return;

    const isSolved = board.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
    );

    console.log(isSolved)
    console.log(board)
    console.log(solution);

    if (isSolved) {
      handleWin();
    } else {
      console.log("Puzzle is not solved yet.");
    }
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

                const isEditableInitially =
                  initialBoard[rowIndex]?.[colIndex] === null;
                const value = cell !== null ? cell.toString() : "";

                let cellStyle = "text-black bg-white";
                let isEditable = isEditableInitially;

                if (!isEditableInitially) {
                  cellStyle = "bg-gray-300 text-blue-600 font-bold";
                } else if (
                  value &&
                  solution &&
                  cell !== solution[rowIndex][colIndex]
                ) {
                  cellStyle = "bg-white text-red-600";
                } else if (
                  value &&
                  solution &&
                  cell === solution[rowIndex][colIndex]
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
                      readOnly={!isEditable || isWon}
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
