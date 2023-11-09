const mongoose = require("mongoose");
const { status } = require("../utils/constants");

const Schema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
        message: { type: String, required: true },
        sender_id: { type: mongoose.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

Schema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("notifications", Schema);
