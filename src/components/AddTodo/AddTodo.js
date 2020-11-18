import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useNotification } from '../../hooks/notification'
import { useQueryClient, useMutation } from 'react-query'

export const AddTodo = () => {
  const history = useHistory()
  const queryClient = useQueryClient()
  const createNotification = useNotification()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const isValid = !!title?.trim() && !!description?.trim()
  const { mutate, isLoading, error } = useMutation('todos', {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
      createNotification({ title: 'Success!', level: 'success' })
      history.goBack()
    },
    onError: () => {
      createNotification({ title: 'There was an error', level: 'error' })
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
