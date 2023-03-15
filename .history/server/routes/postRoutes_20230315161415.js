const express = require('express');
const router = express.Router();
const { getPosts, getPost, updatePost, deletePost, createPost } = require('../controllers/postController')


//get all posts
router.get('/list', getPosts);
//create post
router.post('/create', createPost)
//get single post
router.get('/:id', getPost)
//update post
router.put('/:id', updatePost)
//delete post
router.delete('/:id', deletePost)






module.exports = router;