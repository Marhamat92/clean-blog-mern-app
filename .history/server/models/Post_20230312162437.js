const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post_title: {
    type: String,
    required: true
  },
  post_subtitle: {
    type: String,
    required: true
  },
  //poste_content will be rich text editor
  post_content: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Post = mongoose.model('post', PostSchema);