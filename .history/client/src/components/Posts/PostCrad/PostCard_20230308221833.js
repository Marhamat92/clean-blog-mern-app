import React from 'react'
import './postCard.scss'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

function PostCard() {
  return (
    <Box className='cardContainer'>
      <Typography variant="h2" className='cardTitle'>Man must explore, and this is exploration at its greatest</Typography>
      <Typography variant="h3" className='cardSubtitle'>
        Problems look mighty small from 150 miles up
      </Typography>
      <Typography className='postedBy' variant="body1">Posted by <span>username</span>  on September 24, 2019</Typography>
    </Box>
  )
}

export default PostCard