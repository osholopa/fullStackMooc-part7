import React from 'react'
import BlogListItem from './BlogListItem'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableContainer, Paper } from '@material-ui/core'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs
            .sort((a, b) => (a.likes > b.likes ? -1 : 1))
            .map((blog) => (
              <BlogListItem key={blog.id} user={user} blog={blog} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList
