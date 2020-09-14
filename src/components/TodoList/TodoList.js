import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchTodos } from '../../api/fetchTodos'

export const TodoList = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTodos()
      .then(res => {
        setData(res)
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  if (error) {
    return (
      <h1>
        There was an error.
        <br />
        <button
          onClick={() => {
            fetchTodos()
              .then(res => {
                setData(res)
                setLoading(false)
              })
              .catch(error => {
                setError(error)
                setLoading(false)
              })
          }}>
          Try again
        </button>
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
