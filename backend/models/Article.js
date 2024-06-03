const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  art_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;


