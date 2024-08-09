const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();


router.get('/register', (req, res) => {
    res.render('register');
  });

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      });
      await user.save();
      res.redirect('/users/login');
  } catch (error) {
      res.redirect('/users/register');
    }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
  const user = await User.findOne({ username: req.body.username });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    req.session.userId = user._id;
    res.redirect('/users/profile');
    } else {
    res.redirect('/users/login');
    }
  } catch (error) {
    console.log(error);
    res.redirect('/users/login');
  }
});

router.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/users/login');
  }
  
  const user = await User.findById(req.session.userId).populate('boards');
  res.render('userPage', { user });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/users/profile');
    }
    res.redirect('/users/login');
  });
});

module.exports = router;