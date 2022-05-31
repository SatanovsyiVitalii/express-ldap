const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const LdapStrategy = require("passport-ldapauth");

const options = require("./options");

const app = new express();

passport.use(new LdapStrategy(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
  res.send({status: 'ok'});
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});