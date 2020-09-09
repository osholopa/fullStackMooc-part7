import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  addBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer'
import { initializeUser, login, logout } from './reducers/loginReducer'
import { getAllUsers } from './reducers/usersReducer'
import { Switch, Route } from 'react-router-dom'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(getAllUsers())
  }, [dispatch])

  const handleLogin = (userObject) => {
    dispatch(login(userObject))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const blogFormRef = React.createRef()

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          'info',
          3
        )
      )
      dispatch(addBlog(newBlog))
    } catch (exception) {
      dispatch(setNotification(exception.message, 'error', 5))
    }
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}
      <Switch>
        <Route path="/users">
          <Users users={users}/>
        </Route>
        <Route path="/">
          {user ? (
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
          ) : null}
          {blogs
            .sort((a, b) => (a.likes > b.likes ? -1 : 1))
            .map((blog) => (
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
              />
            ))}
        </Route>
      </Switch>
    </div>
  )
}

export default App
