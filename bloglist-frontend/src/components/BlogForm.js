import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Typography, TextField, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

const BlogForm = () => {
  const dispatch = useDispatch()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
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
      title: title.attributes.value,
      author: author.attributes.value,
      url: url.attributes.value,
    }
    createBlog(newBlog)
    author.reset()
    title.reset()
    url.reset()
  }

  if (!user) return null

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <Typography variant="h4">Create new</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField label="title" {...title.attributes} />
          </div>
          <div>
            <TextField label="author" {...author.attributes} />
          </div>
          <div>
            <TextField label="url" {...url.attributes} />
          </div>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            color="primary"
            id="create-button"
            type="submit"
          >
            save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              blogFormRef.current.toggleVisibility()
            }}
          >
            cancel
          </Button>
        </form>
      </Togglable>
    </>
  )
}

export default BlogForm
