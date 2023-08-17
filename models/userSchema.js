const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    name: { type: String, required: true},
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "userSchema" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "userSchema" }],
});
module.exports = mongoose.model("userSchema", userSchema);