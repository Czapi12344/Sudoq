# backend/app.py
from fastapi import FastAPI
from sqlalchemy import create_engine, text
import random
import re
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Restrict to frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "postgresql://sudoku_user:sudoku_pass@db_sudoku:5432/sudoku_db"
engine = create_engine(DATABASE_URL)


@app.get("/new-game/")
async def new_game(difficulty: str):
    """Fetch a random unused puzzle from the database."""
    if difficulty not in ["easy", "medium", "hard"]:
        raise HTTPException(status_code=400, detail="Invalid difficulty level")

    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT id, puzzle FROM sudoku_puzzles WHERE difficulty = :difficulty ORDER BY RANDOM() LIMIT 1"),
            {"difficulty": difficulty}
        )
        puzzle = result.fetchone()
        if puzzle:
            puzzle_id = puzzle[0]
            puzzle_content = puzzle[1]

            # Convert the puzzle format from `{}` to `[]` and `NULL` to `null`
            puzzle_json = re.sub(r'\bNULL\b', 'null', puzzle_content)
            puzzle_json = puzzle_json.replace('{', '[').replace('}', ']')

            # Optionally remove the puzzle from the database to mark it as "used"
            connection.execute(text("DELETE FROM sudoku_puzzles WHERE id = :id"), {"id": puzzle_id})

            return {"puzzle": puzzle_json}
        else:
            raise HTTPException(status_code=404, detail="No puzzle available")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
