import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchTodo } from '../../api/fetchTodo'

export const Todo = () => {
  const { id } = useParams()

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTodo(id)
      .then(res => {
        setLoading(false)
        setData(res)
      })
      .catch(err => {
        setLoading(false)
        setError(err)
      })
  }, [id])

  if (error) {
    return (
      <>
        <h1>There was an error.</h1>
        <button
          onClick={() =>
            fetchTodo(id)
              .then(res => {
                setLoading(false)
                setData(res)
              })
              .catch(err => {
                setLoading(false)
                setError(err)
              })
          }>
          Try again
        </button>
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
