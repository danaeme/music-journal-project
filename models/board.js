const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    board_name: { type: String, required: true }, 
    description: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JournalEntry' }],
    image_url: { type: String },
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;