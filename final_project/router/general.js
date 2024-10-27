const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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
    return res.status(404).json({ message: "book not found"});

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
    return res.status(404).json({ message: "book not found"});

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
    return res.status(404).json({ message: "book not found"});

  return res.status(200).send(JSON.stringify(foundBook, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const foundBook = books[isbn];

  if (!foundBook)
    return res.status(404).json({ message: "book not found"});

  return res.status(200).send(JSON.stringify({ reviews: foundBook.reviews }, null, 4));
});

module.exports.general = public_users;
