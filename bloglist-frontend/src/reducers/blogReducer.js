import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    const response = await blogService.create(newBlog)
    dispatch({
      type: 'ADD_BLOG',
      data: response,
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog.id,
    })
  }
}

export const likeBlog = (blog) => {
  const newObject = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }

  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, newObject)
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog,
    })
  }
}

export const commentBlog = (id, comment) => {
  
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(id, comment)

    dispatch({
      type: 'COMMENT_BLOG',
      data: commentedBlog,
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data)
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      )
    case 'COMMENT_BLOG':
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      )
    default:
      return state
  }
}

export default blogReducer
