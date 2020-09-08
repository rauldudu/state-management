import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import fetchMock from 'fetch-mock'
import {
  render,
  waitForElementToBeRemoved,
  screen
} from '@testing-library/react'
import { configureStore } from '../../store/store'
import { Todo } from './Todo'

const todo = {
  title: 'My Todo',
  description: 'Do something'
}

const setup = () => {
  return render(
    <Provider store={configureStore()}>
      <MemoryRouter>
        <Todo />
      </MemoryRouter>
    </Provider>
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
