import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'
import {
  Typography,
  Link,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItemText,
} from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import DeleteIcon from '@material-ui/icons/Delete'

const Blog = ({ blog }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const comment = useField('text')

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleComment = (blog, comment) => {
    dispatch(commentBlog(blog.id, comment.attributes.value))
    comment.reset()
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
      history.push('/')
    }
  }

  if (!blog) return null
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h4">{blog.title}</Typography>
          <Typography variant="h6">by {blog.author}</Typography>
          <Typography variant="h5">
            <Link href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </Link>
          </Typography>
          <Typography variant="h5">{blog.likes} likes</Typography>
          <Button
            variant="outlined"
            color="primary"
            id="likeBtn"
            onClick={() => handleLike(blog)}
          >
            <Icon>thumb_up</Icon>
          </Button>

          <Typography variant="h6">added by {blog.user.name}</Typography>
          {user !== null && blog.user.name === user.name ? (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => handleRemove(blog)}
            >
              remove
            </Button>
          ) : null}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h5">comments</Typography>
          <TextField label="comment" {...comment.attributes} />
          <Button
            variant="outlined"
            onClick={() => handleComment(blog, comment)}
          >
            Add comment
          </Button>
          {blog.comments.length > 0 ? (
            <>
              <List>
                {blog.comments.map((comment) => (
                  <ListItemText key={comment} primary={comment} />
                ))}
              </List>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}

export default Blog
