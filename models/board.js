const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    board_name: { type: String, required: true }, 
});
