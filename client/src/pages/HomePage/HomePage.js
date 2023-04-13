import React, { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../App'
import { Button } from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import AppBar from '../../components/Navbar/AppBar';
import Slide from '../../components/Slide/Slide';
import PostList from '../../components/Posts/PostList/PostList';
import './homePage.scss'
import slideImage from '../../images/home-bg.jpg'
import { useSelector } from 'react-redux'



function HomePage() {

  const navigate = useNavigate()

  const { user } = useSelector(
    (state => state.auth)
  )

  const { posts } = useSelector(
    (state) => state.posts
  )



  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      <div className='homePage'>
        <Slide title="Clean Blog" subtitle={`A Blog Theme by ${user?.name}`} image={slideImage} />
        <PostList />
      </div>
    </>
  )
}

export default HomePage