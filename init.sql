-- Create tables
CREATE TABLE IF NOT EXISTS zodiac_prediction (
    id SERIAL PRIMARY KEY,
    zodiac VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    prediction_text TEXT NOT NULL
);

-- Insert test data
INSERT INTO zodiac_prediction (zodiac, date, prediction_text) VALUES
    ('Scorpio', '2024-06-21', '123124141'),
    ('Scorpio', '2024-06-22', 'ffaefae'),
    ('Scorpio', '2024-06-23', '1231ghsthtsdhd24141'),
    ('Scorpio', '2024-06-24', '123124142311');