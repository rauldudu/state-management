import React, { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { Link, useHistory } from 'react-router-dom'
import { useNotification } from '../../hooks/notification'

export const AddTodo = () => {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const isValid = !!title?.trim() && !!description?.trim()
  const history = useHistory()
  const queryClient = useQueryClient()
  const createNotification = useNotification()

  const { mutate, isLoading, error } = useMutation('todos', {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
      history.goBack()
      createNotification({ title: 'Created Successfully!', level: 'success' })
    }
  })

  return (
    <>
      <Link to="/">Back</Link>
      <h1>Add Todo</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          mutate({ title, description })
        }}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            placeholder="Title"
            disabled={isLoading}
            onChange={e => setTitle(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            disabled={isLoading}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" disabled={!isValid || isLoading}>
          Save
        </button>
        {!isLoading && error && <p>There was an error</p>}
      </form>
    </>
  )
}
