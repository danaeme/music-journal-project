const express = require('express');
const Board = require('../models/board');
const User = require('../models/user');
const router = express.Router();

//add a board
router.get('/add', (req, res) => {
    res.render('addBoard');
  });

router.post('/add', async (req, res) => {
  try {
    const board = new Board({
        user_id: req.session.userId,
        board_name: req.body.board_name,
        description: req.body.description
    });
    await board.save();
    
    const user = await User.findById(req.session.userId);
    user.boards.push(board._id);
    await user.save();

    res.redirect('/users/profile');

} catch (error) {
    console.error(error);
    res.redirect('/boards/add');
}
});

//view board
router.get('/:id', async (req, res) => {
  const board = await Board.findById(req.params.id);
  res.render('boardPage', { board });
});

module.exports = router;
