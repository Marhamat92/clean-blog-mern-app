import React from 'react'
import ApplicationBar from '../Navbar/AppBar'
import Footer from '../Footer/Footer'
import { useContext } from 'react'
import { UserContext } from '../../App'
import { useSelector } from 'react-redux'


function Layout(
  {
    children
  }
) {

  const { user } = useSelector(
    (state => state.auth)
  )





  return (
    <>
      {user && <ApplicationBar />}
      {children}
      {user && <Footer />}
    </>
  )
}

export default Layout