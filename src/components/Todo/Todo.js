import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchTodo } from '../../api/fetchTodo'
import { usePromise } from '../../hooks/usePromise'

export const Todo = () => {
  const { id } = useParams()
  const { data, error, loading, execute } = usePromise(() => fetchTodo(id), [id])

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
      {loading && 'Loading...'}
      {!loading && (
        <>
          <Link to="/">Back</Link>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </>
      )}
    </>
  )
}
