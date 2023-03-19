const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const userExist=username=>users.username==username;
public_users.post("/register", (req,res) => {
  if(!userExist(req.query.username)){
    let {username,password}=req.query;
      users.push({username,password});
      res.status(200).json({message:"User is successfully registered"})
  }
  else{
    res.status(404).json({message:"User already exist"})
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  return res.status(300).json(books[req.params.isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  return res.status(300).json(Object.values(books).filter(book=>book.author==req.params.author));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json(Object.values(books).filter(book=>book.title==req.params.title));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let updatedBooks =books[req.params.isbn].reviews
  return res.status(300).json(updatedBooks);
});

module.exports.general = public_users;
