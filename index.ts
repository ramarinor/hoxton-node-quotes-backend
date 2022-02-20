import Database from 'better-sqlite3';
import express from 'express';

const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(
  cors({
    origin: '*'
  })
);

const db = new Database('./data.db', {
  verbose: console.log
});

const getAllQuotes = db.prepare(`
SELECT * FROM quotes;
`);

const getQuoteById = db.prepare(`
SELECT * FROM quotes WHERE id=?;
`);

const createQuote = db.prepare(`
INSERT INTO quotes (content, firstName, lastName, age, image ) VALUES (?, ?, ? ,? ,? );
`);

const updateQuote = db.prepare(`UPDATE quotes SET
  content=?, firstName=?, lastName=?, age=?, image=? WHERE id=?;
`);

const deleteQuote = db.prepare(`
DELETE FROM quotes WHERE id=?;
`);

app.get('/', function (req, res) {
  res.send('We are learning node js!');
});

app.get('/quotes', function (req, res) {
  const allQuotes = getAllQuotes.all();
  res.send(allQuotes);
});

app.get('/random', function (req, res) {
  const allQuotes = getAllQuotes.all();
  const randomIndex = Math.floor(Math.random() * allQuotes.length);
  res.send(allQuotes[randomIndex]);
});

app.get('/quotes/:id', (req, res) => {
  const id = req.params.id;
  const match = getQuoteById.get(id);
  if (match) {
    res.send(match);
  } else {
    res.status(404).send({ error: 'Quote not found.' });
  }
});

app.post('/quotes', (req, res) => {
  const { content, firstName, lastName, age, image } = req.body;
  const errors = [];
  if (typeof content !== 'string') {
    errors.push('Content is missing or not a string');
  }
  if (typeof firstName !== 'string') {
    errors.push('First name is missing or not a string');
  }
  if (typeof lastName !== 'string') {
    errors.push('Last name is missing or not a string');
  }
  if (typeof age !== 'number' && age < 0) {
    errors.push('Age should be a number higher than 0!');
  }
  if (typeof image !== 'string') {
    errors.push('Image is missing or not a string');
  }

  if (errors.length === 0) {
    const result = createQuote.run(content, firstName, lastName, age, image);
    const quote = getQuoteById.get(result.lastInsertRowid);
    res.status(201).send(quote);
  } else {
    res.status(400).send({ errors: errors });
  }
});

app.patch('/quotes/:id', (req, res) => {
  const { content, firstName, lastName, age, image } = req.body;
  const existingQutoe = getQuoteById.get(req.params.id);
  updateQuote.run(
    content ?? existingQutoe.name,
    firstName ?? existingQutoe.firstName,
    lastName ?? existingQutoe.lastName,
    age ?? existingQutoe.age,
    image ?? existingQutoe.image,
    req.params.id
  );
  const updatedQuote = getQuoteById.get(req.params.id);
  res.send(updatedQuote);
});

app.delete('/quotes/:id', (req, res) => {
  const id = req.params.id;
  const result = deleteQuote.run(id);

  if (result.changes !== 0) {
    res.send({ message: 'Quote deleted successfully.' });
  } else {
    res.status(404).send({ error: 'Quote does not exist.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
