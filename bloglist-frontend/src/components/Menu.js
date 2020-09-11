import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {user !== null ? (
          <Typography>
            {`${user.name} logged in `}
            <Button variant="contained" size="small" onClick={handleLogout}>logout</Button>
          </Typography>
        ) : null}
      </Toolbar>
    </AppBar>
  )
}

export default Menu
