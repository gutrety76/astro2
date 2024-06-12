const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const Enum = require('enum');
const { addDays } = require('./helpers');

const app = express();
const port = 3003;


const zodiac_flags = new Enum({'Aquarius': 0, 'Pisces': 1, 'Aries': 2, 'Taurus': 3, 'Gemini': 4, 'Cancer': 5, 'Leo': 6, 'Virgo': 7, 'Libra': 8, 'Scorpio': 9, 'Sagittarius': 10, 'Capricorn': 11}, { ignoreCase: true })

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


app.get('/get_zodiac_predictions_by_date', async (req, res) => {
  try {
    const zodiac = zodiac_flags.get(req.query.zodiac)
    console.log(zodiac)
    const [day, month, year] = req.query.date.split('.');
    const formattedDate = `${year}-${month}-${day}`;
    const result = await pool.query('SELECT * FROM zodiac_prediction');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/get_zodiac_predictions', async (req, res) => {
  try {
    const zodiac = zodiac_flags.get(req.query.zodiac).value
    const [day, month, year] = req.query.date_now.split('.');
    const start_date = `${year}-${month}-${day}`;

    const days_to_get = parseInt(req.query.days_to_get)


    const end_date = addDays(start_date, days_to_get)
    
    const result = await pool.query('SELECT * FROM zodiac_prediction  WHERE zodiac = $1 AND date BETWEEN $2 AND $3', [zodiac, start_date, end_date]);
    res.json(result.rows);
    console.log(result)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/post_zodiac_prediction', async (req, res) => {
  try {
    const body = req.body;
    const [day, month, year] = body.date.split('.');
    const zodiac = zodiac_flags.get(body.zodiac).value;
    const prediction_text = body.value;

    // Create the date string in YYYY-MM-DD format manually
    const formattedDate = `${year}-${month}-${day}`;

    const query = 'INSERT INTO zodiac_prediction (zodiac, date, value) VALUES ($1, $2, $3)';
    const values = [zodiac, formattedDate, prediction_text];

    const result = await pool.query(query, values);
    
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Node.js server is running on http://localhost:${port}`);
});
