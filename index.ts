import express from "express";
type Quote = {
  id: number;
  content: string;
  firstName: string;
  lastName: string;
  age: number;
  image: string;
};

const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
);
let quotes: Quote[] = [
  {
    id: 1,
    content: "To do or not to do!",
    firstName: "Nicolas",
    lastName: "Marcora",
    age: 34,
    image:
      "https://miro.medium.com/fit/c/1360/1360/1*GET26Y6wcljxmybUcxe0yw.jpeg"
  },
  {
    id: 2,
    content: "To math or not to math!",
    firstName: "Rinor",
    lastName: "Rama",
    age: 26,
    image:
      "https://scontent.fprn12-1.fna.fbcdn.net/v/t1.6435-9/106620065_10213860914317337_8468048895594297740_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=7OBp2vatqPAAX9jd86x&_nc_ht=scontent.fprn12-1.fna&oh=00_AT_MUHZtXNDU3EhitHEQTeP9VJTNAW3UpYI6hI3fDZzrnw&oe=62302D1D"
  },
  {
    id: 3,
    content: "To meth or not to meth!",
    firstName: "Random",
    lastName: "Drugster",
    age: 31,
    image:
      "https://static.toiimg.com/thumb/86802399.cms?width=680&height=512&imgsize=19342"
  },
  {
    id: 4,
    content: "To excercise or not to excercise!",
    firstName: "Elidon",
    lastName: "Morina",
    age: 27,
    image: "https://miro.medium.com/max/3150/0*DPy5UUHustmH8OKb."
  },
  {
    id: 5,
    content: "To ask or not to ask!",
    firstName: "Egon",
    lastName: "Loli",
    age: 30,
    image: "https://mapo.al/wp-content/uploads/2014/02/egon-loli-300x200.jpg"
  },
  {
    id: 6,
    content: "To help or not to help!",
    firstName: "Ed",
    lastName: "Putans",
    age: 29,
    image:
      "https://media-exp1.licdn.com/dms/image/C4D03AQEpcAcgGSoS_Q/profile-displayphoto-shrink_200_200/0/1633355002274?e=1648684800&v=beta&t=S3OxlNE-ELMcpM76gaNWsaMLnCZg40kpVbDocI3sxU0"
  },
  {
    id: 7,
    content: "To invade or not to invade!",
    firstName: "Vladimir",
    lastName: "Putin",
    age: 69,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Vladimir_Putin_%282020-02-20%29.jpg/1200px-Vladimir_Putin_%282020-02-20%29.jpg"
  },
  {
    id: 8,
    content: "To run or not to run!",
    firstName: "Ukrainian",
    lastName: "Soldier",
    age: 38,
    image:
      "https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/afp/2021/04/27/14/1619525018556.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg"
  },
  {
    id: 9,
    content: "To bomb or not to bomb!",
    firstName: "Joe",
    lastName: "Biden",
    age: 79,
    image:
      "https://www.whitehouse.gov/wp-content/uploads/2021/04/P20210303AS-1901-cropped.jpg"
  },
  {
    id: 10,
    content: "To gas or not to gas!",
    firstName: "Olaf",
    lastName: "Scholz",
    age: 63,
    image:
      "https://media.hotnews.ro/media_server1/image-2021-08-11-24972380-41-olaf-scholz.jpg"
  }
];

let quoteIdCount = quotes.length;

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

app.get("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = quotes.find((quote) => quote.id === id);
  if (match) {
    res.send(match);
  } else {
    res.status(404).send({ error: "Quote not found." });
  }
});

app.post("/quotes", (req, res) => {
  const { content, firstName, lastName, age, image } = req.body;
  const errors = [];
  if (typeof content !== "string") {
    errors.push("Content is missing or not a string");
  }
  if (typeof firstName !== "string") {
    errors.push("First name is missing or not a string");
  }
  if (typeof lastName !== "string") {
    errors.push("Last name is missing or not a string");
  }
  if (typeof age !== "number" && age < 0) {
    errors.push("Age should be a number higher than 0!");
  }
  if (typeof image !== "string") {
    errors.push("Image is missing or not a string");
  }

  if (errors.length === 0) {
    quoteIdCount++;
    const newQuote: Quote = {
      id: quoteIdCount,
      content: content,
      firstName: firstName,
      lastName: lastName,
      age: age,
      image: image
    };
    quotes.unshift(newQuote);
    res.status(201).send(newQuote);
  } else {
    res.status(400).send({ errors: errors });
  }
});

app.patch("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const quoteToChange = quotes.find((quote) => quote.id === id);

  if (quoteToChange) {
    if (typeof req.body.content === "string")
      quoteToChange.content = req.body.content;
    if (typeof req.body.firstName === "string")
      quoteToChange.firstName = req.body.firstName;
    if (typeof req.body.lastName === "string")
      quoteToChange.lastName = req.body.lastName;
    if (typeof req.body.age === "number") quoteToChange.age = req.body.age;
    if (typeof req.body.image === "string")
      quoteToChange.image = req.body.image;
    res.send(quoteToChange);
  } else {
    res.status(404).send({ error: "Dog not found." });
  }
});

app.delete("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);

  const match = quotes.find((quote) => quote.id === id);

  if (match) {
    quotes = quotes.filter((quote) => quote.id !== id);
    res.send("Quote deleted sucessfully");
  } else {
    res.status(404).send({ error: "Quote not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
