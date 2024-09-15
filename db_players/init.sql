CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    score INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0
);
