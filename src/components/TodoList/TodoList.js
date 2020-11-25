import React from 'react'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const TodoList = () => {
  const history = useHistory()
  const { data, isLoading, error, refetch } = useQuery('todos') // JS API

  if (error) {
    return (
      <>
        <h1>There was an error.</h1>
        <button onClick={() => refetch()}>Try again</button>
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
