const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hobby: { type: String, required: true },
    gender: { type: String, required: true, enum: values = ['male', 'female', 'non-binary'] },
    interested_gender: { type: String, required: true, enum: values = ['male', 'female', 'non-binary'] },
    location: { type: String, required: true },
    image: { type: String },
    interest: { type: Object}
}, {
    versionKey: false,
    timeStamps: true
})

module.exports = mongoose.model('User', userSchema);
