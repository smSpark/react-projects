import { useState, useEffect } from 'react'
import Form from './components/Form'
import List from './components/List'
import Filters from './components/Filters'

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'Learn HTML',
      done: true,
      edit: false,
      show: true
    },
    {
      id: 2,
      text: 'Learn CSS',
      done: true,
      edit: false,
      show: true
    },
    {
      id: 3,
      text: 'Learn JavaScript',
      done: false,
      edit: false,
      show: true
    },
    {
      id: 4,
      text: 'Stay Alive',
      done: false,
      edit: false,
      show: true
    }
  ])
  const [count, setCount] = useState(0)

  useEffect(() => {
    const amount = todos.filter((todo) => !todo.done).length
    setCount(amount)
  }, [todos])

  return (
    <>
      <h1 className='title'>React Todo App</h1>
      <Form todos={todos} setTodos={setTodos} />
      <h3 className='counter'>
        {todos.length > 0
          ? count
            ? `${count} todos left`
            : 'All todos completed'
          : 'There are no todos'}
      </h3>
      {todos.length > 0 && <Filters todos={todos} setTodos={setTodos} />}
      <List todos={todos} setTodos={setTodos} />
    </>
  )
}

export default App
