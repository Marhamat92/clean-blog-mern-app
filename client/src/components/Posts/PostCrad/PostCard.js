import React from 'react'
import './postCard.scss'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import { deletePostSlice, reset } from '../../../features/posts/postsSlice';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

function PostCard({
  postDescription,
  postTitle,
  postedBy,
  createdDate,
  post
}) {


  const dispatch = useDispatch()
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.posts
  )
  const deletePost = () => {
    dispatch(deletePostSlice(post._id))

    if (isSuccess) {
      toast('Post removed successfully!')
    }
  }

  if (isLoading) {
    return <CircularProgress />
  }



  return (
    <Box className='cardContainer'>
      <DeleteIcon onClick={deletePost} className='deleteIcon' />
      <Link to={`/updatePost/${post._id}`} className='link'>
        <EditIcon className='editIcon' />
      </Link>
      <Link
        to={post._id}
        className='link'
      >
        <Typography variant="h2" className='cardTitle'>{postTitle}</Typography></Link>
      <Typography variant="h3" className='cardSubtitle'>
        {postDescription}
      </Typography>
      <Typography className='postedBy' variant="body1">Posted by <span>{postedBy}</span> and created date is {createdDate.slice(0, 10)}</Typography>
    </Box >
  )
}

export default PostCard