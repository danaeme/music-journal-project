const express = require('express');
const Board = require('../models/board');
const router = express.Router();

//add a board
router.get('/add', (req, res) => {
    res.render('addBoard');
  });

router.post('/add', async (req, res) => {
    const board = new Board({
      user_id: req.session.userId,
      board_name: req.body.board_name,
      description: req.body.description
    });
    await board.save();
    res.redirect('/users/profile');
});

//view board
router.get('/:id', async (req, res) => {
    const board = await Board.findById(req.params.id).populate('entries');
    res.render('boardPage', { board });
});

module.exports = router;
