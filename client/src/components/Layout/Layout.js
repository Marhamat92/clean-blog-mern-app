import React from 'react'
import ApplicationBar from '../Navbar/AppBar'
import Footer from '../Footer/Footer'
import { useContext } from 'react'
import { UserContext } from '../../App'


function Layout(
  {
    children
  }
) {

  const userContext = useContext(UserContext)

  return (
    <>
      {userContext.email && <ApplicationBar />}
      {children}
      {userContext.email && <Footer />}
    </>
  )
}

export default Layout