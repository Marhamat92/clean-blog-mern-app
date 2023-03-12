import React, { useState } from 'react'
import Slide from '../../../components/Slide/Slide'
import { Stack, TextField, Button } from '@mui/material'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useContext } from 'react'
import { UserContext } from '../../App'


function AddPostPage() {

  const { user } = useContext(UserContext)
  console.log(user, 'user from add post page')

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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


    const dataToSubmit = {
      post_title: post.post_title,
      post_subtitle: post.post_subtitle,
      post_content: html
    }
    //create with current user
    axios.post('http://localhost:5000/post/create', dataToSubmit)
      .then(res => {

        if (res.status === 200) {
          setMessage('Post created successfully')
          setPost({
            post_title: '',
            post_subtitle: '',

          })
          setEditorState({
            post_content: EditorState.createEmpty()
          })
        } else {
          setErrorMessage('Post creation failed')
        }
      }
      )
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
        <p style={{ color: 'green' }}>{message}</p>
        <p style={{ color: 'red' }}>{errorMessage}</p>
        <Button type='submit' color="secondary" variant="contained">Add Post</Button>
      </Stack>
    </div>
  )
}

export default AddPostPage