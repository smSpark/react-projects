import { useRef } from 'react'

function List({ todos, setTodos }) {
  function RegularItemTemplate({ todo: { id, text, done } }) {
    return (
      <>
        <button
          className={`btn ${done ? 'warning' : 'success'}`}
          onClick={() => completeTodo(id)}
        >
          {done ? 'Cancel' : 'Complete'}
        </button>
        <span className={`text ${done && 'completed'}`}>{text}</span>
        <button
          className={`btn info ${done && 'disabled'}`}
          onClick={() => updateTodo(id, text)}
        >
          Update
        </button>
        <button className='btn danger' onClick={() => deleteTodo(id)}>
          Delete
        </button>
      </>
    )
  }

  function UpdateItemTemplate({ todo: { id, text } }) {
    const refText = useRef(null)

    return (
      <>
        <button
          className='btn success'
          onClick={() => updateTodo(id, refText.current.value)}
        >
          Save
        </button>
        <input type='text' className='input' ref={refText} autoFocus />
        <button className='btn warning' onClick={() => updateTodo(id, text)}>
          Cancel
        </button>
      </>
    )
  }

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  function completeTodo(id) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done }
      }
      return todo
    })
    setTodos(newTodos)
  }

  function updateTodo(id, value) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: value, edit: !todo.edit }
      }
      return todo
    })
    setTodos(newTodos)
  }

  return (
    <ul className='list'>
      {todos.map(
        (todo) =>
          todo.show && (
            <li key={todo.id} className='item'>
              {todo.edit ? (
                <UpdateItemTemplate todo={todo} />
              ) : (
                <RegularItemTemplate todo={todo} />
              )}
            </li>
          )
      )}
    </ul>
  )
}

export default List
