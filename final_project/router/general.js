const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  
  if (!username || !password)
    return res.status(400).send(JSON.stringify({ message: "Invalid username or password" }, null, 4));
  
  const existedUser = users.find(user => user.username === username);

  if (existedUser)
    return res.status(400).send(JSON.stringify({ message: "User already exists" }, null, 4));

  users.push({ username, password });
  return res.status(201).send(JSON.stringify({ message: "User resgistered successfully!" }, null, 4));
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const foundBook = books[isbn];
  if (!foundBook)
    return res.status(404).send(JSON.stringify({ message: "book not found"}, null, 4));

  return res.status(200).send(JSON.stringify(foundBook, null, 4));
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const foundBook = [];
  for (let i in books)
    if (books[i].author === author)
      foundBook.push(books[i]);

  if (foundBook.length === 0)
    return res.status(404).send(JSON.stringify({ message: "book not found"}, null, 4));

  return res.status(200).send(JSON.stringify(foundBook, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const foundBook = [];
  for (let i in books)
    if (books[i].title === title)
      foundBook.push(books[i]);

  if (foundBook.length === 0)
    return res.status(404).send(JSON.stringify({ message: "book not found"}, null, 4));

  return res.status(200).send(JSON.stringify(foundBook, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const foundBook = books[isbn];

  if (!foundBook)
    return res.status(404).send(JSON.stringify({ message: "book not found"}, null, 4));

  return res.status(200).send(JSON.stringify({ reviews: foundBook.reviews }, null, 4));
});

module.exports.general = public_users;

async function getAllBooks() {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${encodeURI(author)}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/title/${encodeURI(title)}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
