const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',

  },
  post_title: {
    type: String,
    required: true
  },
  post_subtitle: {
    type: String,
    required: true
  },
  post_content: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Post = mongoose.model('post', PostSchema);