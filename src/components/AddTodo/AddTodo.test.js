import React, { useRef, useReducer, useCallback } from 'react'
import { Router } from 'react-router-dom'
import fetchMock from 'fetch-mock'
import { createMemoryHistory } from 'history'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { QueryClientProvider } from 'react-query'
import NotificationSystem from 'react-notification-system'
import { NotificationContext } from '../../contexts/Notification'
import { queryClient } from '../../services/queryClient'
import { AddTodo } from './AddTodo'

const history = createMemoryHistory()
const todo = {
  title: 'My Todo',
  description: 'Do something'
}

const Wrapper = () => {
  const notificationRef = useRef()
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const notificationRefCallback = useCallback(ref => {
    notificationRef.current = ref
    forceUpdate()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContext.Provider value={notificationRef.current}>
        <Router history={history}>
          <AddTodo />
        </Router>
      </NotificationContext.Provider>
      <NotificationSystem ref={notificationRefCallback} />
    </QueryClientProvider>
  )
}

const setup = () => {
  return render(<Wrapper />)
}

beforeEach(() => {
  jest.spyOn(history, 'goBack')
})

afterEach(() => {
  history.goBack.mockRestore()
  queryClient.clear()
  fetchMock.restore()
})

const expectFormSubmited = async () => {
  expect(screen.getByText('Save')).toBeDisabled()

  fireEvent.change(screen.getByPlaceholderText('Title'), {
    target: { value: todo.title }
  })

  fireEvent.change(screen.getByPlaceholderText('Description'), {
    target: { value: todo.description }
  })

  expect(screen.getByText('Save')).toBeEnabled()

  fireEvent.click(screen.getByText('Save'))
}

test('creates the todo', async () => {
  fetchMock.post(/todos/, { id: 3 }, { delay: 500 })

  setup()

  await expectFormSubmited()

  await waitFor(() => {
    expect(screen.getByText('Success!')).toBeInTheDocument()
  })

  expect(JSON.parse(fetchMock.lastOptions().body)).toEqual(todo)

  expect(history.goBack).toHaveBeenCalled()
})

test('handles the error', async () => {
  fetchMock.post(/todos/, 500, { delay: 500 })

  setup()

  expectFormSubmited()

  await waitFor(() => {
    expect(screen.getByText('There was an error')).toBeInTheDocument()
  })
})
