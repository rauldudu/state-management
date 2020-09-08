import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchTodos } from '../../actions/todos'

export const TodoList = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(state => state.todos)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  if (error) {
    return (
      <h1>
        There was an error.
        <br />
        <button onClick={() => dispatch(fetchTodos())}>Try again</button>
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
