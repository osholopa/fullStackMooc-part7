import React from 'react'
import './Notification.css'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message === null) {
    return null
  }

  const severity =
    notification.notificationType === 'error' ? 'error' : 'success'

  return <Alert severity={severity}>{notification.message}</Alert>
}

export default Notification
