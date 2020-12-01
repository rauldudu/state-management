import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

export const Todo = () => {
  const { id } = useParams()
  const { data, isLoading, error, refetch } = useQuery(`todos/${id}`)

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
