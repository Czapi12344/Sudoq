# generator/generate_sudoku.py
from sudoku import Sudoku  # type: ignore
from sqlalchemy import create_engine, text   # type: ignore
import random

DATABASE_URL = "postgresql://sudoku_user:sudoku_pass@db_sudoku:5432/sudoku_db"
engine = create_engine(DATABASE_URL)

LEVELS = ["easy", "medium", "hard"]


def generate_sudoku_puzzle(difficulty):

    try:

        random_seed = random.randint(0, 1000000)
        base_puzzle = Sudoku(3, seed=random_seed)

        if difficulty == "easy":
            puzzle = base_puzzle.difficulty(0.05)
        elif difficulty == "medium":
            puzzle = base_puzzle.difficulty(0.7)
        elif difficulty == "hard":
            puzzle = base_puzzle.difficulty(0.9)

        return puzzle.board
    except RecursionError as e:
        print(f"Recursion error encountered while generating {difficulty} puzzle: {e}")
        return None


def generate_sudoku_puzzles(difficulty, count=100):

    puzzles = []
    for _ in range(count):
        puzzle = generate_sudoku_puzzle(difficulty)
        if puzzle:
            solution = Sudoku(3, board=puzzle).solve().board
            puzzles.append((puzzle, solution, difficulty))
    return puzzles


def insert_puzzles_to_db(puzzles):

    try:
        with engine.begin() as connection:
            for puzzle, solution, difficulty in puzzles:
                connection.execute(
                    text(
                        "INSERT INTO sudoku_puzzles (puzzle, solution, difficulty) VALUES (:puzzle, :solution, :difficulty)"
                    ),
                    {"puzzle": puzzle, "solution": solution, "difficulty": difficulty},
                )
        print(f"Successfully inserted {len(puzzles)} puzzles.")
    except Exception as e:
        print(f"Error inserting puzzles: {e}")


def check_and_generate_puzzles():

    with engine.connect() as connection:
        for level in LEVELS:
            result = connection.execute(
                text("SELECT COUNT(*) FROM sudoku_puzzles WHERE difficulty = :level"),
                {"level": level},
            )
            count = result.scalar()
            if count < 10:
                print(
                    f"Only {count} {level} puzzles available, generating 100 new puzzles."
                )
                puzzles = generate_sudoku_puzzles(level, 100)
                insert_puzzles_to_db(puzzles)
                print(f"Generated and inserted 100 new {level} puzzles.")


DATABASE_URL = "postgresql://sudoku_user:sudoku_pass@db_sudoku:5432/sudoku_db"
engine = create_engine(DATABASE_URL)

if __name__ == "__main__":
    check_and_generate_puzzles()
