const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
