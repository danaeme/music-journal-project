const express = require('express');
const JournalEntry = require('../models/journalEntry');
const router = express.Router();

router.get('/add', (req, res) => {
    res.render('addEntry');
  });
  
router.post('/add', async (req, res) => {
  try {
  const record = new JournalEntry({
    user_id: req.session.userId,
    album_title: req.body.album_title,
    artist: req.body.artist,
    personal_notes: req.body.personal_notes,
    rating: req.body.rating,
  });
  await record.save();
  res.redirect('/users/profile');
} catch (error) {
  console.error(error);
  res.redirect('/entries/add');
}
});

  // View entry
router.get('/:id', async (req, res) => {
    const journalEntry = await JournalEntry.findById(req.params.id);
    res.render('entryPage', { journalEntry });
  });

// Edit entry
router.get('/:id/edit', async (req, res) => {
    const journalEntry = await JournalEntry.findById(req.params.id);
    res.render('editEntry', { journalEntry });
  });

router.post('/:id/edit', async (req, res) => {
try {
  const journalEntry = await JournalEntry.findById(req.params.id);
  journalEntry.album_title = req.body.album_title;
  journalEntry.artist = req.body.artist;
  journalEntry.personal_notes = req.body.personal_notes;
  journalEntry.rating = req.body.rating;
  await journalEntry.save();
  res.redirect(`/records/${req.params.id}`);
} catch (error) {
  console.error(error);
  res.redirect(`/entries/${req.params.id}/edit`);
}
});

module.exports = router;
