import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import validator from 'validator'
import { regexPassword } from '../utils'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'

import {
  Paper,
  Container,
  Link,
  Stack,
  Button,
  Box,
  Divider,
  Avatar,
  Typography,
  TextField,
  FilledInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material'
import {
  Face as FaceIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import theme from '../styles/theme'

function Login({ }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth)





  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  })
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    fetchError: false,
    fetchErrorMsg: '',
  })

  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value
    let isCorrectValue =
      fieldName === 'email'
        ? validator.isEmail(currValue)
        : regexPassword.test(currValue)

    isCorrectValue
      ? setErrors({ ...errors, [fieldName]: false })
      : setErrors({ ...errors, [fieldName]: true })

    setValues({ ...values, [fieldName]: event.target.value })
  }

  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const handleSubmit = async (event) => {
    event.preventDefault()

    const userData = {
      email: values.email,
      password: values.password,
    }

    dispatch(login(userData))

  }

  return (
    <>
      <Container sx={{ marginTop: 'calc(100vh - 40%)' }} maxWidth='xs'>
        <Paper elevation={6}>
          <Container
            maxWidth='sm'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '20px',
            }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.primary.main,
                boxShadow: '0px 0px 8px rgba(131,153,167,0.99)',
              }}>
              <FaceIcon sx={{ fontSize: 70 }} />
            </Avatar>
            <h2>Login</h2>
          </Container>
          <Stack
            component='form'
            onSubmit={handleSubmit}
            noValidate
            spacing={6}
            sx={{ bgcolor: '#f5f5f6', padding: '40px' }}>
            <TextField
              variant='filled'
              type='email'
              label='Email'
              value={values.email}
              onChange={handleChange('email')}
              error={errors.email}
              helperText={errors.email && 'Please insert a valid email address'}
            />

            <FormControl variant='filled'>
              <InputLabel htmlFor='password-field'>Password</InputLabel>
              <FilledInput
                id='password-field'
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                error={errors.password}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleShowPassword}
                      edge='end'>
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Button
                variant='contained'
                size='large'
                type='submit'
                disabled={errors.email || errors.password}
                sx={{
                  minWidth: '70%',
                }}>
                Login
              </Button>
            </Box>
            {errors.fetchError && (
              <FormHelperText error>{errors.fetchErrorMsg}</FormHelperText>
            )}
            <Divider />
            <Typography paragraph align='center'>
              Don't have an account yet?{' '}
              <Link component={RouterLink} to='/signup'>
                Sign up here
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </>
  )
}

export default Login