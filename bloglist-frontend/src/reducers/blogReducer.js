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
            data: response
        })
    }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
        return [...state, action.data]
    default:
      return state
  }
}

export default blogReducer
