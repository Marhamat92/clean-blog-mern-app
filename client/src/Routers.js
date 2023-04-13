import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage/HomePage'
import Layout from './components/Layout/Layout'
import AboutPage from './pages/AboutPage/AboutPage'
import AddPostPage from './pages/Posts/AddPost/AddPostPage'
import PostDetail from './pages/Posts/PostDetail/PostDetail'
import { useSelector } from 'react-redux'
import UpdatePostPage from './pages/Posts/UpdatePost/UpdatePost'


function RoutesComp() {

  const { user } = useSelector(
    (state) => state.auth
  )

  return (
    <>

      <Routes>


        <Route path='/' element={<HomePage />} />
        <Route path='/:id' element={<PostDetail />} />

        <Route path='/updatePost/:id' element={<UpdatePostPage />} />

        <Route path='/about' element={<AboutPage />} />
        <Route path='/newPost' element={<AddPostPage />} />

        <Route path='*' element={<h1>Page couldn't found!</h1>} />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </>

  )
}

export default RoutesComp