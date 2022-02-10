import express from "express";
type Quote = {
  id: number;
  content: string;
  author: string;
};

const cors = require("cors");
const app = express();
const PORT = 4000;

const quotes: Quote[] = [
  {
    id: 1,
    content: "To do or not to do!",
    author: "Nicolas Marcora"
  },
  {
    id: 2,
    content: "To math or not to math!",
    author: "Rinor Rama"
  },
  {
    id: 3,
    content: "To meth or not to meth!",
    author: "Random Drugster"
  },
  {
    id: 4,
    content: "To excercise or not to excercise!",
    author: "Elidon Morina"
  },
  {
    id: 5,
    content: "To ask or not to ask!",
    author: "Egon Loli"
  },
  {
    id: 6,
    content: "To help or not to help!",
    author: "Ed Putans"
  },
  {
    id: 7,
    content: "To invade or not to invade!",
    author: "Vladimir Putin"
  },
  {
    id: 8,
    content: "To run or not to run!",
    author: "Ukrainian Soldier"
  },
  {
    id: 9,
    content: "To bomb or not to bomb!",
    author: "Joe Biden"
  },
  {
    id: 10,
    content: "To gas or not to gas!",
    author: "Olaf Scholz"
  }
];

app.use(
  cors({
    origin: "*"
  })
);

app.get("/", function (req, res) {
  res.send("We are learning node js!");
});

app.get("/quotes", function (req, res) {
  res.send(quotes);
});

app.get("/random", function (req, res) {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.send(quotes[randomIndex]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
