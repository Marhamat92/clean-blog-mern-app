import React from 'react'
import Slide from '../../../components/Slide/Slide'
import { Stack, TextField, Button } from '@mui/material'
import { RicosEditor } from 'ricos-editor';


function AddPostPage() {
  return (
    <div>
      <Slide title="Add New Post" image="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80" />
      <Stack spacing={2} direction="column" sx={{ width: '100%', maxWidth: 500, margin: 'auto', marginTop: '20px', marginBottom: '20px', padding: '20px' }}
        component='form'
        noValidate
        autoComplete='off'

      >
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
        />
        <RicosEditor placeholder={'Type here!'} />
        <Button color="secondary" variant="contained">Add Post</Button>
      </Stack>
    </div>
  )
}

export default AddPostPage