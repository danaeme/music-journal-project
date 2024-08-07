const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    board_name: { type: String, required: true }, 
    description: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JournalEntry' }]
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;