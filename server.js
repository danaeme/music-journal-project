require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');


const app = express();

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.set('view engine', 'ejs');

 
app.get('/', (req, res) => {
    res.redirect('/users/profile');
 });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
 }); 