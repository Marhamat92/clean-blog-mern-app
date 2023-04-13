import React, { useEffect, useState } from 'react'
import Slide from '../../../components/Slide/Slide'
import { Stack, TextField, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createPostSlice, reset } from '../../../features/posts/postsSlice'
import CircularProgress from '@mui/material/CircularProgress';

import './addPost.scss'



function AddPostPage() {

  const { user } = useSelector(
    (state => state.auth)
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.posts
  )






  const [post, setPost] = useState({
    post_title: '',
    post_subtitle: '',
    post_content: '',
  })



  const handlePostSubmit = (e) => {
    e.preventDefault()




    const postData = {
      post_title: post.post_title,
      post_subtitle: post.post_subtitle,
      post_content: post.post_content,

    }

    dispatch(createPostSlice(postData))

    if (isSuccess) {
      toast("Post Created Successfully!")
    }

    setPost({
      post_title: '',
      post_subtitle: '',
      post_content: '',
    })

  }







  return (
    <div className='addPost'>
      <Slide title="Add New Post" image="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80" />
      <Stack spacing={2} direction="column" sx={{ width: '100%', maxWidth: 500, margin: 'auto', marginTop: '20px', marginBottom: '20px', padding: '20px' }}
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handlePostSubmit}
      >
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={post.post_title}
          onChange={(e) => setPost({ ...post, post_title: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Short Description"
          variant="outlined"
          value={post.post_subtitle}
          onChange={(e) => setPost({ ...post, post_subtitle: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Content"
          variant="outlined"
          value={post.post_content}
          onChange={(e) => setPost({ ...post, post_content: e.target.value })}
          rows="8"
          multiline
        />
        <Button type='submit' color="secondary" variant="contained">Add Post</Button>
      </Stack>
    </div>
  )
}

export default AddPostPage