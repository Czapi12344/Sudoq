from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, text
import random
import re
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "postgresql://sudoku_user:sudoku_pass@db_sudoku:5432/sudoku_db"
engine = create_engine(DATABASE_URL)


@app.get("/new-game/")
async def new_game(difficulty: str):
    """Fetch a random unused puzzle and its solution from the database."""
    if difficulty not in ["easy", "medium", "hard"]:
        raise HTTPException(status_code=400, detail="Invalid difficulty level")

    with engine.connect() as connection:
        result = connection.execute(
            text(
                "SELECT id, puzzle, solution FROM sudoku_puzzles WHERE difficulty = :difficulty ORDER BY RANDOM() LIMIT 1"
            ),
            {"difficulty": difficulty},
        )
        puzzle_data = result.fetchone()
        if puzzle_data:
            puzzle_id, puzzle_content, solution_content = puzzle_data

            puzzle_json = re.sub(r"\bNULL\b", "null", puzzle_content)
            puzzle_json = puzzle_json.replace("{", "[").replace("}", "]")

            solution_json = re.sub(r"\bNULL\b", "null", solution_content)
            solution_json = solution_json.replace("{", "[").replace("}", "]")

            connection.execute(
                text("DELETE FROM sudoku_puzzles WHERE id = :id"), {"id": puzzle_id}
            )

            return {"puzzle": puzzle_json, "solution": solution_json}
        else:
            raise HTTPException(status_code=404, detail="No puzzle available")
