import React from 'react'
import { Link } from 'react-router-dom'
import { fetchTodos } from '../../api/fetchTodos'
import { usePromise } from '../../hooks/usePromise'

export const TodoList = () => {
  const { data, loading, error, execute } = usePromise(() => fetchTodos(), [])

  if (error) {
    return (
      <h1>
        There was an error.
        <br />
        <button onClick={execute}>Try again</button>
      </h1>
    )
  }

  return (
    <>
      <h1>Todos</h1>
      {loading && 'Loading...'}
      {!loading && (
        <ul>
          {data.map(todo => (
            <li key={todo.id}>
              <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
