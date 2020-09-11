import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchTodo } from '../../api/fetchTodo'
// import { fetchTodo } from '../../actions/todo'

export const Todo = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTodo(id).then(res => {
      setData(res)
      setLoading(false)
    }).catch(error => {
      setError(error)
      setLoading(false)
    })
  }, [id])

  if (error) {
    return (
      <>
        <h1>There was an error.</h1>
        <button onClick={() => {
          fetchTodo(id).then(res => {
            setData(res)
            setLoading(false)
          }).catch(error => {
            setError(error)
            setLoading(false)
          })
        }}>Try again</button>
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
