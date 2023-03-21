import React from 'react'
import PostCard from '../PostCrad/PostCard'
import './postList.scss'
import { Button } from '@mui/material'

function PostList() {
  return (
    <div className='listContainer'>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <div className='buttonContainer' >
        <Button className='olderPostsButton' variant="contained" color="secondary" size="large">Older Posts</Button>
      </div>
    </div>
  )
}

export default PostList