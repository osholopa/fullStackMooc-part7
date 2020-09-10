import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const userObject = {
      username,
      password,
    }
    dispatch(login(userObject))
    setUsername('')
    setPassword('')
  }
  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </>
    )
  } else {
    return (
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
      </div>
    )
  }
}

export default LoginForm
