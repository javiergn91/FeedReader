const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    creation_date: { type: Date, required: true },
    object_id: { type: Number, required: true, unique: true },
    url: { type: String, required: true }
});

module.exports = mongoose.model("Article", articleSchema);