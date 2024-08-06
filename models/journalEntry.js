const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
    album_title: { type: String, required: true },
    artist: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    personal_notes: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);
module.exports = JournalEntry;
