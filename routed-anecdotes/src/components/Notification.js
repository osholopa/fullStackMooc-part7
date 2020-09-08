import React from 'react'

const Notification = ({ notification }) => {
  const style = {
    color: 'red',
    border: '1px solid red',
  }
  return notification ? <div style={style}>{notification}</div> : null
}

export default Notification
