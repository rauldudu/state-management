import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import fetchMock from 'fetch-mock'
import {
  render,
  waitForElementToBeRemoved,
  screen
} from '@testing-library/react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../../services/queryClient'
import { TodoList } from './TodoList'

const todos = [
  {
    id: 1,
    title: 'My Todo 1',
    description: 'Do something'
  },
  {
    id: 2,
    title: 'My Todo 2',
    description: 'Do something again'
  }
]

const setup = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <TodoList />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  queryClient.clear()
  fetchMock.restore()
})

test('loads the todos', async () => {
  fetchMock.get(/todos/, todos, { delay: 500 })

  setup()

  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

  todos.forEach(todo => {
    expect(screen.getByText(todo.title)).toBeInTheDocument()
  })
})

test('handles the error', async () => {
  fetchMock.get(/todos/, 500, { delay: 500 })

  setup()

  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

  expect(screen.getByText('There was an error.')).toBeInTheDocument()
})
