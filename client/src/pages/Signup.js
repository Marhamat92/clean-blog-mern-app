import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import validator from 'validator'
import { regexPassword } from '../utils'
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
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import CircularProgress from '@mui/material/CircularProgress';



function Signup() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth)




  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    showPassword: false,
    showRepeatPassword: false,
  })


  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    repeatPassword: false,
    fetchError: false,
    fetchErrorMsg: '',
  })


  //handle value changes
  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value
    switch (fieldName) {
      case 'name':
        currValue.length > 0
          ? setErrors({ ...errors, name: false })
          : setErrors({ ...errors, name: true })
        break
      case 'email':
        validator.isEmail(currValue)
          ? setErrors({ ...errors, email: false })
          : setErrors({ ...errors, email: true })
        break

      case 'password':
        regexPassword.test(currValue)
          ? setErrors({ ...errors, password: false })
          : setErrors({ ...errors, password: true })
        break

      case 'repeatPassword':
        currValue === values.password
          ? setErrors({ ...errors, repeatPassword: false })
          : setErrors({ ...errors, repeatPassword: true })
        break
    }
    setValues({ ...values, [fieldName]: event.target.value })
  }

  const handleShowPassword = (showPasswordField) => {
    setValues({
      ...values,
      [showPasswordField]: !values[showPasswordField],
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


  //submit 
  const handleSubmit = (event) => {
    event.preventDefault()

    if (values.password !== values.repeatPassword) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
      }

      dispatch(register(userData))


    }
  }

  if (isLoading) {
    return <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  }

  return (
    <>
      <Container sx={{ marginTop: 'calc(100vh - 45%)' }} maxWidth='sm'>
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
            <h2>Register a new account</h2>
          </Container>
          <Stack
            component='form'
            onSubmit={handleSubmit}
            noValidate
            spacing={6}
            sx={{ bgcolor: '#f5f5f6', padding: '40px' }}>
            <TextField
              variant='filled'
              type='text'
              label='Name'
              value={values.name}
              onChange={handleChange('name')}
              error={errors.name}
              helperText={errors.name && 'Please insert a valid name'}
            />
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
                      onClick={() => handleShowPassword('showPassword')}
                      edge='end'>
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <FormHelperText error={errors.password}>
                Password must be at least 8 characters, have one symbol, 1
                uppercase letter, 1 lowercase and 1 digit
              </FormHelperText>
            </FormControl>

            <FormControl variant='filled'>
              <InputLabel htmlFor='password-repeat-field'>
                Repeat password
              </InputLabel>
              <FilledInput
                id='password-repeat-field'
                type={values.showRepeatPassword ? 'text' : 'password'}
                value={values.repeatPassword}
                onChange={handleChange('repeatPassword')}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => handleShowPassword('showRepeatPassword')}
                      edge='end'>
                      {values.showRepeatPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.repeatPassword && (
                <FormHelperText error={errors.repeatPassword}>
                  Password must be the same as above
                </FormHelperText>
              )}
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
                sx={{
                  minWidth: '70%',
                }}>
                Sign me up!
              </Button>
            </Box>
            {errors.fetchError && (
              <FormHelperText error>{errors.fetchErrorMsg}</FormHelperText>
            )}
            <Divider />
            <Typography paragraph align='center'>
              Already have an account?{' '}
              <Link component={RouterLink} to='/'>
                Login here
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </>
  )
}

export default Signup