const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    my_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
}, {
    versionKey: false
})

module.exports = mongoose.model('matchingProfile', Schema);