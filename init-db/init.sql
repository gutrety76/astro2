CREATE DATABASE IF NOT EXISTS astro;

\connect astro;

CREATE TABLE IF NOT EXISTS zodiac_prediction (
    id SERIAL PRIMARY KEY,
    zodiac VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    prediction_text TEXT NOT NULL
);