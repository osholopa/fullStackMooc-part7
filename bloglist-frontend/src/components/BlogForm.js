import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const user = useSelector((state) => state.user)

  const blogFormRef = React.createRef()

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

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    createBlog(newBlog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  if (!user) return null

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              id="url"
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id="create-button" type="submit">
            create
          </button>
        </form>
      </Togglable>
    </>
  )
}

export default BlogForm
