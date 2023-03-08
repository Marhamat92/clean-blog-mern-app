import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useContext } from 'react'
import { UserContext } from './App'
import HomePage from './pages/HomePage/HomePage'
import Layout from './components/Layout/Layout'
import AboutPage from './pages/AboutPage/AboutPage'
import AddPostPage from './pages/Posts/AddPost/AddPostPage'


function RoutesComp() {
  const userContext = useContext(UserContext)

  console.log(userContext)


  return (
    <>

      <Routes>
        {
          userContext.email && (
            <>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/newPost' element={<AddPostPage />} />
            </>
          )
        }{
          !userContext.email && (
            <>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />

            </>
          )
        }
      </Routes>
    </>

  )
}

export default RoutesComp