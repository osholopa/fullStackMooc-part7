import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useField } from '../hooks'
import { Typography, TextField, Button } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('test')
  const password = useField('password')

  const user = useSelector((state) => state.user)

  const handleSubmit = (event) => {
    event.preventDefault()
    const userObject = {
      username: username.attributes.value,
      password: password.attributes.value,
    }
    dispatch(login(userObject))
    username.reset()
    password.reset()
  }
  if (user === null) {
    return (
      <>
        <Typography variant="h6">Log in to application</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField label="username" {...username.attributes} />
          </div>
          <div>
            <TextField label="password" {...password.attributes} />
          </div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </form>
      </>
    )
  } else return null
}

export default LoginForm
