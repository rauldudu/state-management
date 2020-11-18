import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchTodos } from '../../api/fetchTodos'
import { usePromise } from '../../hooks/usePromise'

export const TodoList = () => {
  // const { data, loading, error, execute } = usePromise(() => fetchTodos(), [])
  const history = useHistory()
  const { data, isLoading, error, refetch } = useQuery('todos')

  if (error) {
    return (
      <>
        <h1>There was an error.</h1>
        <button onClick={refetch}>Try again</button>
      </>
    )
  }

  return (
    <>
      <h1>Todos</h1>
      {isLoading && 'Loading...'}
      {!isLoading && (
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
