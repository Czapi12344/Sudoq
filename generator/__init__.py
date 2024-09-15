# generator/generate_sudoku.py
from sqlalchemy import create_engine, text
import sudoku 
import random

# Database connection
DATABASE_URL = "postgresql://sudoku_user:sudoku_pass@db_sudoku:5432/sudoku_db"
engine = create_engine(DATABASE_URL)

# Difficulty levels
LEVELS = ["easy", "medium", "hard"]

def generate_sudoku_puzzle(difficulty):
    """Generate a Sudoku puzzle based on the difficulty."""
    if difficulty == "easy":
        return sudoku.generate(min_clues=35)  # Example for easy
    elif difficulty == "medium":
        return sudoku.generate(min_clues=28)  # Example for medium
    elif difficulty == "hard":
        return sudoku.generate(min_clues=22)  # Example for hard
    else:
        raise ValueError("Invalid difficulty level")

def generate_sudoku_puzzles(difficulty, count=100):
    """Generate a batch of Sudoku puzzles for a given difficulty."""
    puzzles = []
    for _ in range(count):
        puzzle = generate_sudoku_puzzle(difficulty)
        puzzles.append((puzzle, difficulty))
    return puzzles

def insert_puzzles_to_db(puzzles):
    """Insert a batch of puzzles into the database."""
    with engine.connect() as connection:
        for puzzle, difficulty in puzzles:
            connection.execute(
                text("INSERT INTO sudoku_puzzles (puzzle, difficulty) VALUES (:puzzle, :difficulty)"),
                {"puzzle": puzzle, "difficulty": difficulty}
            )

def check_and_generate_puzzles():
    """Check if there are less than 10 puzzles for each difficulty, and generate more if needed."""
    with engine.connect() as connection:
        for level in LEVELS:
            result = connection.execute(
                text("SELECT COUNT(*) FROM sudoku_puzzles WHERE difficulty = :level"),
                {"level": level}
            )
            count = result.scalar()
            if count < 10:
                print(f"Only {count} {level} puzzles available, generating 100 new puzzles.")
                puzzles = generate_sudoku_puzzles(level, 100)
                insert_puzzles_to_db(puzzles)
                print(f"Generated and inserted 100 new {level} puzzles.")

if __name__ == "__main__":
    while True:
        check_and_generate_puzzles()
        time.sleep(3600)  # Check every hour
