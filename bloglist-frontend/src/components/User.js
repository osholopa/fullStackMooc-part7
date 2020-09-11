import React from 'react'
import { Typography, List, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h6">added blogs:</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItemText key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListItemText>
        ))}
      </List>
    </div>
  )
}

export default User
