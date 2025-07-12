const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photoURL: { type: String },
    location: { type: String },
    skillsOffered: [String],
    skillsWanted: [String],
    availability: [String],
    isProfilePublic: { type: Boolean, default: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
