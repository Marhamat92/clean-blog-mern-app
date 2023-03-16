const Post = require('../models/Post')
const asyncHandler = require('express-async-handler')  //middleware to handle errors in async functions in express instead of using try catch blocks
const User = require('../models/User')



//@ desc Get all posts
//@route GET /post/list
//@access Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.user.id })
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
//only user who created the post can update it
const updatePost = asyncHandler(
  async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
      res.status(400)
      throw new Error('post not found')
    }

    //check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }

    //make sure logged user matches post user
    if (post.author.toString() !== req.user.id) {
      res.status(401)
      throw new Error('user not authorized')
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json(updatedPost)
  })






//@ desc delete a post
//@route DELETE /post/:id
//@access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(400)
    throw new Error('post not found')
  }


  const user = await User.findById(req.user.id)

  //check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //make sure the logged in user matches the post user
  if (post.user.string !== req.user.id) {
    res.status(401)
    throw new Error('user not authorized')
  }


  await post.remove()

  res.status(200).json({
    id: req.params.id
  })
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


