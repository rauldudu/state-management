import {
  FETCH_TODO_LIST_START,
  FETCH_TODO_LIST_SUCCESS,
  FETCH_TODO_LIST_ERROR
} from '../constants/actionTypes'

const intialState = {
  data: null,
  loading: true,
  error: null
}

export const todos = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_TODO_LIST_START: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_TODO_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    }
    case FETCH_TODO_LIST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }
    default:
      return state
  }
}
