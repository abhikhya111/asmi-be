// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(cookieParser(""));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// User model
const User = mongoose.model('User', new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  phone: String
}));

app.use(cors());
const URL = `mongodb+srv://abhikhya:ashi3666@crud.yjywtf4.mongodb.net/dummyDatabase?retryWrites=true&w=majority`
    try {
        mongoose.connect(URL);
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

const productRouter = require("../backend/app/routes/product.route");
const userRouter = require("../backend/app/routes/user.routes");

app.use("/api/products", productRouter);
app.use("/api/users/", userRouter )

// Passport configuration
passport.use(new LocalStrategy((email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return done(err);
      }
      if (!result) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

