const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  likes:{
    type:Number,
    default:0,
    require:true
  },
  author: {
    // id
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // connecting both models
    required: true,
  },
});
const blog = mongoose.model("blog", BlogSchema);
module.exports = blog;
