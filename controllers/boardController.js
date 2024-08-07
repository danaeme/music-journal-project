const express = require('express');
const Board = require('../models/board');
const User = require('../models/user');
const JournalEntry = require('../models/journalEntry');
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

//edit boards
router.get('/:id/edit', async (req, res) => {
  const board = await Board.findById(req.params.id);
  res.render('editBoard', { board });
});

router.post('/:id/edit', async (req, res) => {
  try {
      const board = await Board.findById(req.params.id);
      board.board_name = req.body.board_name;
      board.description = req.body.description;
      await board.save();
      res.redirect('/users/profile');
  } catch (error) {
      console.error(error);
      res.redirect(`/boards/${req.params.id}/edit`);
  }
});

//delete boards
router.delete('/:id', async (req, res) => {
  try {
      const board = await Board.findById(req.params.id);
      if (board) {
          await Board.deleteOne({ _id: req.params.id }); 
          const user = await User.findById(req.session.userId);
          user.boards.pull(board._id);
          await user.save();
      }
      res.redirect('/users/profile');
  } catch (error) {
      console.error(error);
      res.redirect('/users/profile');
  }
});


module.exports = router;
