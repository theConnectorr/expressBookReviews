const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {
    username: "user1",
    password: "password1"
  },
  {
    username: "user2",
    password: "password2"
  },
  {
    username: "user3",
    password: "password3"
  },
];

const isValid = (username)=>{ //returns boolean
  const foundUser = users.find(user => user.username === username);
  if (!foundUser)
    return false;
  return true;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  const foundUser = users.find(user => user.username === username);
  if (!foundUser)
    return false;

  const correctPassword = foundUser.password === password;
  if (!correctPassword)
    return false;

  return true;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).send("Invalid credentials");

  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign({ username }, "my_secret", { expiresIn: 70 });

    req.session.authorization = {
      accessToken,
      username
    }

    return res.status(200).send("Successfully logged in");
  } else {
    return res.status(401).send("Invalid credentials");
  }
});

// Endpoint used to test the authorization process
regd_users.get("/auth/test", (req, res) => {
  res.status(200).send("Accessed");
});

  // Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
