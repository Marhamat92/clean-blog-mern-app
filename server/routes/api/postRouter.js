const express = require('express');
const router = express.Router();
const session = require('express-session');


//post model
const Post = require('../../models/Post');
const User = require('../../models/User');



//get session user id and create post with that id then push post id to user posts array
router.post('/create', (req, res) => {
  const newPost = new Post({
    userId: req.session.user._id,
    post_title: req.body.post_title,
    post_subtitle: req.body.post_subtitle,
    post_content: req.body.post_content
  })
  newPost.save()
    .then(post => {
      User.findById(req.session.user._id)
        .then(user => {
          user.posts.push(post._id)
          user.save()
            .then(user => res.json({ msg: 'Post created successfully' }))
            .catch(err => res.status(404).json({ msg: 'Couldnt save post to user' }))
        })
        .catch(err => res.status(404).json({ msg: 'Couldnt find user' }))
    })
    .catch(err => res.status(404).json({ msg: 'Couldnt create post' }))
})






//get all posts
router.get('/list', (req, res) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: 'Couldnt find any book' }))
})


router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'Couldnt find any book' }))
})

router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body)
    .then(post => res.json({ msg: 'Post Updated Successfully' }))
    .catch(err => res.status(404).json({ msg: 'Couldnt update this post' }))
})

router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, req.body)
    .then(post => res.json({ msg: 'Post deleted successfully' }))
    .catch(err => res.status(404).json({ msg: 'Failed to delete the post' }))
})






module.exports = router;