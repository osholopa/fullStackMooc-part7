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

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
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
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}
      <h2>blogs</h2>
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
    </div>
  )
}

export default App
