import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'

const Blog = ({ blog }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog))
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
      <h1>{blog.title}</h1>
      <h2>by {blog.author}</h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <p>{blog.likes} likes</p>
      <button id="likeBtn" onClick={() => handleLike(blog)}>
        like
      </button>
      <p>added by {blog.user.name}</p>
      {user !== null && blog.user.name === user.name ? (
        <button onClick={() => handleRemove(blog)}>remove</button>
      ) : null}
      {blog.comments.length > 0 ? (
        <>
          <h3>comments</h3>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}

export default Blog
