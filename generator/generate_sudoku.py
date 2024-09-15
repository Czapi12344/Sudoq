# generator/generate_sudoku.py
from sudoku import Sudoku  # Import from py-sudoku
from sqlalchemy import create_engine, text
import random

DATABASE_URL = "postgresql://sudoku_user:sudoku_pass@db_sudoku:5432/sudoku_db"
engine = create_engine(DATABASE_URL)

LEVELS = ["easy", "medium", "hard"]


def generate_sudoku_puzzle(difficulty):
    """Generate a unique Sudoku puzzle based on the difficulty using py-sudoku."""
    try:

        random_seed = random.randint(0, 1000000)
        base_puzzle = Sudoku(3, seed=random_seed)

        if difficulty == "easy":
            puzzle = base_puzzle.difficulty(0.5)
        elif difficulty == "medium":
            puzzle = base_puzzle.difficulty(0.7)
        elif difficulty == "hard":
            puzzle = base_puzzle.difficulty(0.9)

        return puzzle.board
    except RecursionError as e:
        print(f"Recursion error encountered while generating {difficulty} puzzle: {e}")
        return None


def generate_sudoku_puzzles(difficulty, count=100):
    """Generate a batch of Sudoku puzzles for a given difficulty."""
    puzzles = []
    for _ in range(count):
        puzzle = generate_sudoku_puzzle(difficulty)
        if puzzle:  
            puzzles.append((puzzle, difficulty))
    return puzzles


def insert_puzzles_to_db(puzzles):
    """Insert a batch of puzzles into the database."""
    try:
        with engine.begin() as connection:
            for puzzle, difficulty in puzzles:
                connection.execute(
<<<<<<< HEAD
                    text(
                        "INSERT INTO sudoku_puzzles (puzzle, solution, difficulty) VALUES (:puzzle, :solution, :difficulty)"
                    ),
                    {"puzzle": puzzle, "solution": solution, "difficulty": difficulty},
=======
                    text("INSERT INTO sudoku_puzzles (puzzle, difficulty) VALUES (:puzzle, :difficulty)"),
                    {"puzzle": puzzle, "difficulty": difficulty}
>>>>>>> parent of 68884dd (fix 2)
                )
        print(f"Successfully inserted {len(puzzles)} puzzles.")
    except Exception as e:
        print(f"Error inserting puzzles: {e}")
<<<<<<< HEAD


=======
        
        
>>>>>>> parent of 68884dd (fix 2)
def check_and_generate_puzzles():
    """Check if there are less than 10 puzzles for each difficulty, and generate more if needed."""
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
