-- Create tables
CREATE TABLE IF NOT EXISTS zodiac_prediction (
    id SERIAL PRIMARY KEY,
    zodiac VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    prediction_text_general TEXT NOT NULL,
    prediction_text_additional TEXT
);
 
-- Insert test data
INSERT INTO zodiac_prediction (zodiac, date, prediction_text_general) VALUES
    ('Scorpio', '2024-06-21', '123124141'),
    ('Scorpio', '2024-06-22', 'ff <b>aef</b> ae'),
    ('Scorpio', '2024-06-23', '1231ghsthtsdhd24141'),
    ('Scorpio', '2024-06-24', '123124142311');