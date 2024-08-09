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

// Add record to board 
router.get('/:id/records/add', async (req, res) => {
  res.render('addRecord', { boardId: req.params.id });
});

router.post('/:id/records/add', async (req, res) => {
  try{
    const record = new JournalEntry ({
      album_title: req.body.album_title,
      artist: req.body.artist,
      rating: req.body.rating,
      personal_notes: req.body.personal_notes,
      spotify_embed_link: req.body.spotify_embed_link, 
      user_id: req.session.userId,
      board_id: req.params.id,
    });
    await record.save();
    const board = await Board.findById(req.params.id);

    board.entries.push(record._id);

    await board.save();

    res.redirect(`/boards/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.redirect(`/boards/${req.params.id}/records/add`);
  }
});

//view board
router.get('/:id', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate('entries');
    if (!board) {
        return res.redirect('/users/profile');
    }
    res.render('boardPage', { board });
} catch (error) {
    console.error(error);
    res.redirect('/users/profile');
}
});

//edit boards
router.get('/:id/edit', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
        return res.redirect('/users/profile');
    }
    res.render('editBoard', { board });
} catch (error) {
    console.error(error);
    res.redirect('/users/profile');
}
});

router.post('/:id/edit', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
        return res.redirect('/users/profile');
    }
    board.board_name = req.body.board_name;
    board.description = req.body.description;
    await board.save();
    res.redirect(`/boards/${req.params.id}`);
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
  }   catch (error) {
      console.error(error);
      res.redirect('/users/profile');
  }
});



module.exports = router;
