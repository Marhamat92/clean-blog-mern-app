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
    userId: req.body.userId,
    post_title: req.body.post_title,
    post_subtitle: req.body.post_subtitle,
    post_content: req.body.post_content,
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
  try {
    let feed = [];

    const currentUser = await getPostUser(req.body.userId)
    if (!currentUser)
      return res.status(404).json({ error: 'User not found' });

    // my posts
    if (currentUser) {
      const userPosts = await Post
        .find({ userId: currentUser._id }).sort({ createdAt: -1 })
        .populate('userId', '_id username firstname lastname email avatar bio followers followings')
    }
    // friends posts
    const userFollowings = currentUser.followings;
    if (userFollowings.length > 0) {
      const friendPosts = await Post.find({ userId: { $in: userFollowings } }).sort({ createdAt: -1 });
      feed = userPosts.concat(friendPosts);
    } else {
      feed = userPosts;
    }
    res.status(200).json(feed);
  } catch (err) {
    res.status(500).json(err);
  }
});



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