const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    profileImage: String,
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    document: String,
    status: { type: String, default: "processing" },
    userType: { type: String, default: "user" }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
