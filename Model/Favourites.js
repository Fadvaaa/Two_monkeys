const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    my_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    liked_users: { type: [mongoose.Types.ObjectId], required: true, ref: 'User' },
}, {
    versionKey: false
})

module.exports = mongoose.model('Favourites', Schema);