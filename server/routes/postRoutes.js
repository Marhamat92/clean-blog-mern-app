const express = require('express');
const router = express.Router();
const { getPosts, getPost, updatePost, deletePost, createPost } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');


//get all posts
router.get('/list', protect, getPosts);  //we added protect middleware to authorize or not authorize for making changes 
//create post
router.post('/create', protect, createPost)
//get single post
router.get('/:id', protect, getPost)
//update post
router.put('/:id', protect, updatePost)
//delete post
router.delete('/:id', protect, deletePost)






module.exports = router;