import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const menuStyle = {
    padding: 5,
    backgroundColor: 'lightgrey'
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div style={menuStyle}>
      <Link to="/">blogs</Link>{' '}
      <Link to="/users">users</Link>{' '}
      {user !== null 
      ? (<>{`${user.name} logged in `}<button onClick={handleLogout}>logout</button></>)
      : null}
    </div>
  )
}

export default Menu
