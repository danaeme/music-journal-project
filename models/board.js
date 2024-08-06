const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    board_name: { type: String, required: true }, 
    description: String,

});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;