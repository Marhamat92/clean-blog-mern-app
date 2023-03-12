const express = require('express');
const router = express.Router();


//post model
const Post = require('../../models/Post');

router.get('/test', (req, res) => {
  res.send('Post router testing')
})





//create post with connected user
router.post('/create', (req, res) => {
  const newPost = new Post({
    ...req.body
  })
  newPost.save()
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ msg: 'Couldnt create this post' }))
})


router.get('/list', async (req, res) => {
  //list posts according to user
  const posts = await Post.find()
  res.json(posts)


  // Post.find()
  //   .then(posts => res.json(posts))
  //   .catch(err => res.status(404).json({ nopostsfound: 'Couldnt list any book' }))
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