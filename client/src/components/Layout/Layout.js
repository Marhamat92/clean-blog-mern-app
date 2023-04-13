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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {user && <ApplicationBar />}
      {children}
      {user && <Footer />}
    </div>
  )
}

export default Layout