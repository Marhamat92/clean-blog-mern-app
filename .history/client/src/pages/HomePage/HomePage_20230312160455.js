import React, { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../App'
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppBar from '../../components/Navbar/AppBar';
import Slide from '../../components/Slide/Slide';
import PostList from '../../components/Posts/PostList/PostList';
import './homePage.scss'
import slideImage from '../../images/home-bg.jpg'

function HomePage() {
  const userContext = useContext(UserContext);

  return (
    <>
      <div className='homePage'>
        <Slide title="Clean Blog" subtitle={`A Blog Theme by ${userContext.email}`} image={slideImage} />
        <PostList />
      </div>
    </>
  )
}

export default HomePage