const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
  ,
  post_title: {
    type: String,
    required: [
      true, 'Please add Post Title'
    ]
  },
  post_subtitle: {
    type: String,
    required: [
      true, 'Please add Post Subtitle'
    ]
  },
  //poste_content will be rich text editor
  post_content: {
    type: Object,
    required: [
      true, 'Please add Post Content'
    ]
  }

}, {
  timestamps: true,
})

module.exports = Post = mongoose.model('post', PostSchema);