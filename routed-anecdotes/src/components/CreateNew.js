import React from 'react'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.attributes.value,
      author: author.attributes.value,
      info: info.attributes.value,
      votes: 0,
    })
    history.push('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content.attributes} />
        </div>
        <div>
          author
          <input {...author.attributes} />
        </div>
        <div>
          url for more info
          <input {...info.attributes} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
