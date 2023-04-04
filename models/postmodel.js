const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  label: { type: String },
  photo_url: { type: String },
});

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
