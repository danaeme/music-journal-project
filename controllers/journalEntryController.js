const express = require('express');
const JournalEntry = require('../models/journalEntry');
const router = express.Router();
const Board = require('../models/board');
const isSignedIn = require('../middleware/isSignedIn');

router.use(isSignedIn);

router.get('/add', (req, res) => {
  res.render('addRecord', { boardId: req.query.boardId });
});

router.post('/add', async (req, res) => {
  try {
      const record = new JournalEntry({
          album_title: req.body.album_title,
          artist: req.body.artist,
          rating: req.body.rating,
          personal_notes: req.body.personal_notes,
          spotify_embed_link: req.body.spotify_embed_link, 
          user_id: req.session.userId,
          board_id: req.body.boardId,
      });
      await record.save();
      
      const board = await Board.findById(req.body.boardId);
      board.entries.push(record._id);
      await board.save();
      
      res.redirect(`/boards/${req.body.boardId}`);
  } catch (error) {
      console.error(error);
      res.redirect(`/boards/${req.body.boardId}/records/add`);
  }
});


  // View entry
router.get('/:id', async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id);
    if (!journalEntry) {
      return res.redirect('/users/profile');
    }
    const boardId = journalEntry.board_id;

    res.render('entryPage', { journalEntry, boardId });
} catch (error) {
  console.error(error);
  res.redirect('/users/profile');
}
});

// Edit entry
router.get('/:id/edit', async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id);
    if (!journalEntry) {
      return res.redirect('/users/profile');
    }
    res.render('editEntry', { journalEntry });
  } catch (error) {
    console.error(error);
    res.redirect('/users/profile');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id);
    if (!journalEntry) {
      return res.redirect('/users/profile');
    }
    journalEntry.album_title = req.body.album_title;
    journalEntry.artist = req.body.artist;
    journalEntry.rating = req.body.rating;
    journalEntry.personal_notes = req.body.personal_notes;
    journalEntry.spotify_embed_link = req.body.spotify_embed_link;
    await journalEntry.save();
    // console.log('Updated successfully.');

    res.redirect(`/records/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.redirect(`/records/${req.params.id}/edit`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await JournalEntry.findByIdAndDelete(req.params.id);
    res.redirect('/users/profile');
  } catch (error) {
    console.error(error);
    res.redirect('/users/profile');
  }
});

module.exports = router;
