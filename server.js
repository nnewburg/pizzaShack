"use strict";

require('dotenv').config();

const express = require("express");
const app = express();
const ENV         = process.env.ENV || "development";
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const PORT = 8080;
const bcrypt = require('bcrypt');
var path = require('path');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000
}));


app.get("/", (req, res) => {
  console.log(req.session.user)
  let templateVars = {user: req.session.user};
  return res.render("index", templateVars);
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.post("/", (req, res) => {
  knex("users").insert({email: req.body.email, password: req.body.password, name: req.body.name}).then(result => {
     knex("users").where({email: req.body.email}).then(result => {
      req.session.user = result[0]
      res.redirect("/")
   })
  })
})

app.post("/logout", (req, res) => {
  req.session.user = ""
  res.redirect("/")
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

