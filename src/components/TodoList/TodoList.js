import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { fetchTodos } from '../../api/fetchTodos'
import { usePromise } from '../../hooks/usePromise'

export const TodoList = () => {
  const { data, loading, error, execute } = usePromise(() => fetchTodos(), [])
  const history = useHistory()

  if (error) {
    return (
      <>
        <h1>There was an error.</h1>
        <button onClick={execute}>Try again</button>
      </>
    )
  }

  return (
    <>
      <h1>Todos</h1>
      {loading && 'Loading...'}
      {!loading && (
        <>
          <button
            className="btn-create"
            onClick={() => history.push('/todos/new')}>
            Create
          </button>
          <ul>
            {data.map(todo => (
              <li key={todo.id}>
                <Link to={`/todo/${todo.id}`}>{todo.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
