const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema({
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    skillOffered: String,
    skillWanted: String,
    message: String,
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Swap", swapSchema);
