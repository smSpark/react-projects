import { useState } from 'react'

function Form({ todos, setTodos }) {
  const [text, setText] = useState('')

  function addTodo(e) {
    e.preventDefault()
    const newTodo = {
      id: Date.now().toString(16).slice(-4).padStart('x', 5),
      text,
      done: false,
      edit: false,
      show: true
    }
    setTodos([...todos, newTodo])
    setText('')
  }

  return (
    <form className='form' onSubmit={addTodo}>
      <input
        type='text'
        placeholder='Text...'
        autoFocus
        className='input'
        value={text}
        onChange={({ target: { value } }) => setText(value)}
      />
      <button className='btn'>Add</button>
    </form>
  )
}

export default Form
