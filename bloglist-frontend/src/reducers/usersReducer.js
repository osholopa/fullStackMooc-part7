import userService from '../services/users'

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users,
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.data
    default:
      return state
  }
}

export default blogReducer
