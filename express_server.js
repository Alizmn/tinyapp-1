const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const morgan = require('morgan');

app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'))
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

function generateRandomString() {
  return Math.random().toString(36).substring(2,8);
};

app.post("/urls", (req, res) => {
  let uniqeShortUrl = generateRandomString();
  urlDatabase[uniqeShortUrl] = req.body.longURL;
  res.redirect(`/urls/${uniqeShortUrl}`);        
});

app.get("/urls/:shortURL", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});
app.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
})

app.get("/*", (req, res) => {
  res.status(404);
  res.send("404 - Not found");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});