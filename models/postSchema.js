const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "userSchema"},
    title: {type: String, required: true},
    description: {type: String, required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userSchema" }],
    comments: [
        {
            text: String,
            author: { type: mongoose.Schema.Types.ObjectId, ref: "userSchema" },
        },
    ],
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);