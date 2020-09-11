import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { getAllUsers } from './reducers/usersReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import { Container, Typography } from '@material-ui/core'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)

  const userMatch = useRouteMatch('/users/:id')
  const userById = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogById = blogMatch
    ? blogs.find((u) => u.id === blogMatch.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <Container>
      <Menu />
      <Notification />
      <Typography variant="h3">Blog app</Typography>
      <LoginForm />
      <Switch>
        <Route path="/users/:id">
          <User user={userById} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blogById} />
        </Route>
        <Route path="/">
          <BlogForm />
          <BlogList />
        </Route>
      </Switch>
    </Container>
  )
}

export default App
