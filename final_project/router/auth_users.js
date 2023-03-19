const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
return users.filter(user=>user.username ==username && user.password==password).length?true:false
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  let {username,password}=req.query;
  console.warn(req.query)
  if(username && password){
    if(authenticatedUser(username,password)){
      let accessToken=jwt.sign({
        data:password
      },'access',{ expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    }
    else{
    return res.status(208).json({message: "Invalid username or password"});
    }
  }
  else{
    return res.status(400).json({message: "Enter username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  if(req.query.review){
    books[req.params.isbn].reviews=req.query.review;
    return res.status(300).json({message:"Review is added",data:books[req.params.isbn]});
  }
  return res.status(400).json({message:"Provide review"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  delete books[req.params.isbn];
  return res.status(200).json({message:`${req.params.isbn} id is successfully removed from books`});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
