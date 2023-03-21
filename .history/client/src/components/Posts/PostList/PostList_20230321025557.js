import React, { useEffect } from 'react'
import PostCard from '../PostCrad/PostCard'
import './postList.scss'
import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { getPostsSlice, reset } from '../../../features/posts/postsSlice'
import authService from '../../../features/auth/authService'
import CircularProgress from '@mui/material/CircularProgress';


function PostList() {

  const dispatch = useDispatch()
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  )

  const { user } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {

    dispatch(getPostsSlice())
    return () => {
      dispatch(reset())
    }

  }, [user, isError, message, dispatch]);


  if (isLoading) {
    return <CircularProgress />
  }

  const renderedPosts = posts.map((post) => {
    return <PostCard key={post._id} postTitle={post.post_title} postDescription={post.post_description} postedBy={user.name} postDate={post.createdAt} />
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