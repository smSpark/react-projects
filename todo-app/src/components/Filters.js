import { useState, useEffect } from 'react'

const FILTERS = {
  All: (todo) => ({ ...todo, show: true }),
  Active(todo) {
    if (!todo.done) {
      return { ...todo, show: true }
    }
    return { ...todo, show: false }
  },
  Completed(todo) {
    if (todo.done) {
      return { ...todo, show: true }
    }
    return { ...todo, show: false }
  }
}

function Filters({ todos, setTodos }) {
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const filteredTodos = todos.map(FILTERS[filter])
    setTodos(filteredTodos)
  }, [filter])

  return (
    <div className='buttons'>
      {Object.keys(FILTERS).map((name) => (
        <button
          key={name}
          type='button'
          className={`btn filter ${name === filter && 'checked'}`}
          onClick={() => setFilter(name)}
        >
          <span>{name}</span>
        </button>
      ))}
    </div>
  )
}

export default Filters
