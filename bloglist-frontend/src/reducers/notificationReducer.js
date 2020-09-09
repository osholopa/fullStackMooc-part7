let timeoutID = null

export const setNotification = (message, notificationType, duration) => {
  if (timeoutID) {
    clearTimeout(timeoutID)
  }
  
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
          message,
          notificationType
      },
    })

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: {
            message: null,
            notificationType: null,
        },
      })
      timeoutID = null
    }, duration * 1000)
  }
}

const notificationReducer = (state = {
    message: null,
    notificationType: null,
  }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default notificationReducer