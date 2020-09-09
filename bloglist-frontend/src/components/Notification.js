import React from 'react'
import './Notification.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state)
  
  if (notification.message === null) {
    return null
  }

  const notificationClass = notification.notificationType === 'error' ? 'error' : 'info'

  return <div className={notificationClass}>{notification.message}</div>
}

export default Notification
