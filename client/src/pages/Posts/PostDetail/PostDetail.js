import React, { useEffect, useState } from 'react'
import Slide from '../../../components/Slide/Slide'
import postDetailImage from '../../../images/post-bg.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { getPostSlice, reset } from '../../../features/posts/postsSlice'
import { useParams } from 'react-router-dom'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './postDetail.scss'
import { EditorState, convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import { Typography } from '@mui/material'





function PostDetail(
) {

  //use params id to get post

  const { id } = useParams()
  console.log(id, 'id')
  const { posts } = useSelector(
    (state) => state.posts
  )

  const dispatch = useDispatch()

  useEffect(() => {


    dispatch(getPostSlice(id))
    return () => {
      dispatch(reset())
    }
  }, [dispatch, id])


  return (
    <div>
      <Slide title={posts.post_title} subtitle={posts.post_subtitle} image={postDetailImage} />
      <div className='post_content'>
        <Typography >
          {posts.post_content}
        </Typography>
      </div>
    </div>
  )
}

export default PostDetail