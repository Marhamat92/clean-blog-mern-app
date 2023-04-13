import React, { useEffect } from 'react'
import PostCard from '../PostCrad/PostCard'
import './postList.scss'
import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { getPostsSlice, reset } from '../../../features/posts/postsSlice'
import authService from '../../../features/auth/authService'
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom'



function PostList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts || {}
  )

  const { user } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    dispatch(getPostsSlice())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])




  if (isLoading) {
    return <CircularProgress />
  }

  if (isError) {
    return <div>{message}</div>
  }




  const renderedPosts = posts.length > 0 && posts?.map((post) => {
    return <PostCard post={post}
      key={post._id} postTitle={post.post_title} postDescription={post.post_subtitle} postedBy={user?.name} createdDate={post.createdAt}
    />
  })




  return (
    <div className='listContainer'>
      {renderedPosts}
      <div className='buttonContainer' >
        <Button className='olderPostsButton' variant="contained" color="secondary" size="large">Older Posts</Button>
      </div>
    </div>
  )
}

export default PostList