import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { TableCell, TableRow } from '@material-ui/core'

const BlogListItem = ({ blog }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}{' '}
        </Link>
      </TableCell>
    </TableRow>
  )
}

BlogListItem.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogListItem
