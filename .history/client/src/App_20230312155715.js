import { useState, useEffect, createContext } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './styles/theme'
import RoutesComp from './Routers'
import axios from 'axios'
import Layout from './components/Layout/Layout'

export const UserContext = createContext({})

function App() {
  const [loading, setLoading] = useState(true)
  const [userSession, setUserSession] = useState({})

  useEffect(() => {
    axios.get('/api/auth')
      .then(res => {
        setUserSession(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])




  return (
    <UserContext.Provider value={userSession}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          {loading ? <>loading...</> : <RoutesComp />}
        </Layout>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App