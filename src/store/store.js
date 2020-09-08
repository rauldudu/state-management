import { createStore, combineReducers, applyMiddleware } from 'redux'
import { todos } from '../reducers/todos'
import { todo } from '../reducers/todo'
import thunk from 'redux-thunk'

export const configureStore = (initialState = {}) => {
  return createStore(
    combineReducers({ todos, todo }),
    initialState,
    applyMiddleware(thunk)
  )
}
