import React, { useEffect, useState } from 'react'
import Slide from '../../../components/Slide/Slide'
import { Stack, TextField, Button, Box } from '@mui/material'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createPostSlice, reset } from '../../../features/posts/postsSlice'
import CircularProgress from '@mui/material/CircularProgress';



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

  })

  const [editorState, setEditorState] = useState({
    post_content: EditorState.createEmpty()
  }
  )

  const handlePostSubmit = (e) => {
    e.preventDefault()
    //submit html and image to server
    const html = convertToRaw(editorState.post_content.getCurrentContent())
    const postData = {
      post_title: post.post_title,
      post_subtitle: post.post_subtitle,
      post_content: html,

    }

    dispatch(createPostSlice(postData))

    setPost({
      post_title: '',
      post_subtitle: '',
    })
    setEditorState({
      post_content: EditorState.createEmpty()
    })


  }



  if (isLoading) {
    return <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  }


  return (
    <div>
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
        <Editor
          editorState={editorState.post_content}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={
            (editorState) => setEditorState({ ...editorState, post_content: editorState })
          }
        />
        <Button type='submit' color="secondary" variant="contained">Add Post</Button>
      </Stack>
    </div>
  )
}

export default AddPostPage