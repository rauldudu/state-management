import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { fetchTodo } from '../../api/fetchTodo'
import { usePromise } from '../../hooks/usePromise'

export const Todo = () => {
  const { id } = useParams()
  const { data, isLoading, error, refetch } = useQuery(`todos/${id}`)
  // const { data, loading, error, execute } = usePromise(() => fetchTodo(id), [
  //   id
  // ])

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
      {isLoading && 'Loading...'}
      {!isLoading && (
        <>
          <Link to="/">Back</Link>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </>
      )}
    </>
  )
}
