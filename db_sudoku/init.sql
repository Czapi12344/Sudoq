CREATE TABLE IF NOT EXISTS sudoku_puzzles (
    id SERIAL PRIMARY KEY,
    puzzle TEXT NOT NULL,
    difficulty VARCHAR(10) NOT NULL
);
