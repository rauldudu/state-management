import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import fetchMock from 'fetch-mock'
import {
  render,
  waitForElementToBeRemoved,
  screen
} from '@testing-library/react'
import { Todo } from './Todo'

const todo = {
  title: 'My Todo',
  description: 'Do something'
}

const setup = () => {
  return render(

      <MemoryRouter>
        <Todo />
      </MemoryRouter>

  )
}

test('loads the todo', async () => {
  fetchMock.get(/todos/, todo)

  setup()

  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

  expect(screen.getByText(todo.title)).toBeInTheDocument()
  expect(screen.getByText(todo.description)).toBeInTheDocument()

  fetchMock.reset()
})

test('handles the error', async () => {
  fetchMock.get(/todos/, 500)

  setup()

  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

  expect(screen.getByText('There was an error.')).toBeInTheDocument()

  fetchMock.reset()
})
