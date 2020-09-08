import * as api from '../api/fetchTodo'
import {
  FETCH_TODO_START,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_ERROR
} from '../constants/actionTypes'

export const fetchTodo = id => async dispatch => {
  dispatch({ type: FETCH_TODO_START })

  try {
    const data = await api.fetchTodo(id)
    dispatch({ type: FETCH_TODO_SUCCESS, payload: data })
  } catch (e) {
    dispatch({ type: FETCH_TODO_ERROR, payload: e })
  }
}
