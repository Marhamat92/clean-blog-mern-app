import React, { useEffect, useState } from 'react'
import Slide from '../../../components/Slide/Slide'
import { Stack, TextField, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { updatePostSlice, reset, getPostSlice } from '../../../features/posts/postsSlice'
import CircularProgress from '@mui/material/CircularProgress';
import './updatePost.scss'
import { useParams } from 'react-router-dom'



function UpdatePostPage() {

  const { user } = useSelector(
    (state => state.auth)
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()



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
    dispatch(updatePostSlice({ ...post, _id: id }))

    if (isSuccess) {
      toast("Post Updated Successfully!")
    }

    navigate('/')

  }



  useEffect(() => {
    dispatch(getPostSlice(
      {
        _id: id
      }
    ))
    const post = posts.length > 0 && posts.find((post) => post._id === id)
    setPost(post)
  }, [


  ])







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
        <Button type='submit' color="secondary" variant="contained">Update Post</Button>
      </Stack>
    </div>
  )
}

export default UpdatePostPage