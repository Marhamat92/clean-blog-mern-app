import React from 'react'
import Slide from '../../../components/Slide/Slide'


function AddPostPage() {
  return (
    <div>
      <Slide title="Add New Post" image="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&w=1000&q=80" />
      <Stack
        tokens={{ childrenGap: 20 }}
        styles={{ root: { width: '100%' } }}
        component="form"

      >
        <StackItem>
          <TextField label="Title" />
        </StackItem>
        <StackItem>
          <TextField label="Content" multiline rows={4} />
        </StackItem>
        <StackItem>
          <PrimaryButton text="Add Post" />
        </StackItem>
      </Stack>
    </div>
  )
}

export default AddPostPage