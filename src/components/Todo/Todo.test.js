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
import { Todo } from './Todo'

const todo = {
  title: 'My Todo',
  description: 'Do something'
}

const setup = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Todo />
      </MemoryRouter>
    </QueryClientProvider>
  )
}

beforeEach(() => {
  queryClient.clear()
  fetchMock.restore()
})

test('loads the todo', async () => {
  fetchMock.get(/todos/, todo, { delay: 500 })

  setup()

  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

  expect(screen.getByText(todo.title)).toBeInTheDocument()
  expect(screen.getByText(todo.description)).toBeInTheDocument()
})

test('handles the error', async () => {
  fetchMock.get(/todos/, 500, { delay: 500 })

  setup()

  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

  expect(screen.getByText('There was an error.')).toBeInTheDocument()
})
