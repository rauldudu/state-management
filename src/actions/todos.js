import * as api from '../api/fetchTodos'
import {
  FETCH_TODO_LIST_START,
  FETCH_TODO_LIST_SUCCESS,
  FETCH_TODO_LIST_ERROR
} from '../constants/actionTypes'

export const fetchTodos = () => async dispatch => {
  dispatch({ type: FETCH_TODO_LIST_START })

  try {
    const data = await api.fetchTodos()
    dispatch({ type: FETCH_TODO_LIST_SUCCESS, payload: data })
  } catch (e) {
    dispatch({ type: FETCH_TODO_LIST_ERROR, payload: e })
  }
}
