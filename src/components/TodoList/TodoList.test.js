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
    <Provider store={configureStore()}>
      <MemoryRouter>
        <TodoList />
      </MemoryRouter>
    </Provider>
  )
}

test('loads the todos', async () => {
  fetchMock.get(/todos/, todos)

  setup()

  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

  todos.forEach(todo => {
    expect(screen.getByText(todo.title)).toBeInTheDocument()
  })

  fetchMock.reset()
})

test('handles the error', async () => {
  fetchMock.get(/todos/, 500)

  setup()

  await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

  expect(screen.getByText('There was an error.')).toBeInTheDocument()

  fetchMock.reset()
})
