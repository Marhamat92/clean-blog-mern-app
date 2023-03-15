const Post = require('../models/Post')
const asyncHandler = require('express-async-handler')  //middleware to handle errors in async functions in express instead of using try catch blocks




//@ desc Get all posts
//@route GET /post/list
//@access Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id })
  res.json(posts)

})


//@ desc create a post
//@route POST /post/create
//@access Private
const createPost = asyncHandler(async (req, res) => {
  const { post_title, post_content, post_subtitle, author } = req.body;
  const post = await Post.create({
    post_title: post_title,
    post_subtitle: post_subtitle,
    post_content: post_content,
    author: req.user.id
  })
  if (post) {
    res.status(201).json(post)
  } else {
    res.status(400)
    throw new Error('Invalid post data')
  }
})


//@ desc update a post 
//@route PUT /post/:id
//@access Private
const updatePost = asyncHandler(async (req, res) => {
  const post = Post.findById(req.params.id)

  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedPost)
})


//@ desc delete a post
//@route DELETE /post/:id
//@access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post) {
    await post.remove()
    res.json({ message: 'Post removed' })
  }
  else {
    res.status(404)
    throw new Error('Post not found')
  }
})

//@ desc get a post
//@route GET /post/:id
//@access Private
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post) {
    res.json(post)
  }
  else {
    res.status(404)
    throw new Error('Post not found')
  }
})







module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPost
}


