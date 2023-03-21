import React from 'react'
import './postCard.scss'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

function PostCard({
  postDescription,
  postTitle,
  postedBy,
  createdDate
}) {
  return (
    <Box className='cardContainer'>
      <Typography variant="h2" className='cardTitle'>{postTitle}</Typography>
      <Typography variant="h3" className='cardSubtitle'>
        {postDescription}
      </Typography>
      <Typography className='postedBy' variant="body1">Posted by <span>{postedBy}</span> and created date is {createdDate.slice(0, 10)}</Typography>
    </Box>
  )
}

export default PostCard