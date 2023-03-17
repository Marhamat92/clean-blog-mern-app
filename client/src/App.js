import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './styles/theme'
import RoutesComp from './Routers'
import axios from 'axios'
import Layout from './components/Layout/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <RoutesComp />
        </Layout>
      </ThemeProvider>
      <ToastContainer />
    </>
  )
}

export default App