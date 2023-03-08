import React from 'react'
import Slide from '../../../components/Slide/Slide'
import { Stack, TextField, Button } from '@mui/material'


function AddPostPage() {
  return (
    <div>
      <Slide title="Add New Post" image="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80" />
      <Stack spacing={2} direction="column" sx={{ width: '100%', maxWidth: 500, margin: 'auto', marginTop: '20px', marginBottom: '20px' }}>
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
        <TextField
          id="outlined-basic"
          label="Content"
          variant="outlined"
        />
        <Button color="secondary" variant="contained">Add Post</Button>
      </Stack>
    </div>
  )
}

export default AddPostPage