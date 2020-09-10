import React from 'react'
import BlogListItem from './BlogListItem'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <div>
      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => (
          <BlogListItem key={blog.id} user={user} blog={blog} />
        ))}
    </div>
  )
}

export default BlogList
