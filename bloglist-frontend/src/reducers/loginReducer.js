import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

export const login = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setNotification('login successful', 'info', 3))

      dispatch({
        type: 'LOG_IN',
        data: user,
      })
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INITIALIZE',
        data: user,
      })
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch({
      type: 'LOG_OUT',
    })
  }
}

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.data
    case 'LOG_IN':
      return action.data
    case 'LOG_OUT':
      return null
    default:
      return state
  }
}

export default loginReducer
