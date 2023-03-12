const express = require('express');
const router = express.Router();


//post model
const Post = require('../../models/Post');

router.get('/test', (req, res) => {
  res.send('Post router testing')
})





//create post with connected user
router.post('/create', async (req, res) => {
  console.log(req.body, 'before new post')
  const newPost = new Post({
    postedBy: req.body.postedBy,
    post_title: req.body.post_title,
    post_subtitle: req.body.post_subtitle,
    post_content: req.body.post_content
  })
  console.log(newPost, 'new post');
  try {
    const post = await newPost.save()
    res.json(post)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
})



//get all posts with user id
router.get('/list', async (req, res) => {
  let feed = []
  const currentUser = await getPostUser(req.body.postedBy)
  if (!currentUser) {
    res.status(404).json({ msg: 'User not found' })
  }

  if (currentUser) {
    const posts = await Post.find({ postedBy: currentUser._id })
    if (!posts) {
      res.status(404).json({ msg: 'No posts found' })
    }
    if (posts) {
      console.log(posts, 'posts')
      feed = posts
      res.json(feed)
    }
  }
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