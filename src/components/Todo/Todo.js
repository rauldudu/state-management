import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchTodo } from '../../actions/todo'

export const Todo = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(state => state.todo)

  useEffect(() => {
    dispatch(fetchTodo(id))
  }, [dispatch, id])

  if (error) {
    return (
      <h1>
        There was an error.
        <br />
        <button onClick={() => dispatch(fetchTodo(id))}>Try again</button>
      </h1>
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
