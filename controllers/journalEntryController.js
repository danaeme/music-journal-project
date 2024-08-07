const express = require('express');
const JournalEntry = require('../models/journalEntry');
const router = express.Router();


  // View entry
router.get('/:id', async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id);
    if (!journalEntry) {
        return res.redirect('/users/profile');
    }
    res.render('entryPage', { journalEntry });
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

router.post('/:id/edit', async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id);
    if (!journalEntry) {
        return res.redirect('/users/profile');
    }
    journalEntry.album_title = req.body.album_title;
    journalEntry.artist = req.body.artist;
    journalEntry.rating = req.body.rating;
    journalEntry.personal_notes = req.body.personal_notes;
    await journalEntry.save();
    res.redirect(`/records/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.redirect(`/entries/${req.params.id}/edit`);
  }
});

module.exports = router;
