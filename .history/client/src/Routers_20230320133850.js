import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useContext } from 'react'
import { UserContext } from './App'
import HomePage from './pages/HomePage/HomePage'
import Layout from './components/Layout/Layout'
import AboutPage from './pages/AboutPage/AboutPage'
import AddPostPage from './pages/Posts/AddPost/AddPostPage'
import { useSelector } from 'react-redux'


function RoutesComp() {

  const { user } = useSelector(
    (state) => state.auth
  )

  return (
    <>

      <Routes>
        {user ?
          <>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/newPost' element={<AddPostPage />} />
            <Route path='*' element={<h1>Page couldn't found!</h1>} />
          </>
          :

          <>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </>
        }


      </Routes>
    </>

  )
}

export default RoutesComp