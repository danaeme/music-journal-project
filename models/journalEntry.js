const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
    album_title: { type: String, required: true },
    artist: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    personal_notes: String,
    spotify_embed_link: { type: String, required: true }, 
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    board_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true},
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);
module.exports = JournalEntry;
