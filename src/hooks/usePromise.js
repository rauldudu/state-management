import { useReducer, useRef, useEffect } from 'react'

export const actions = Object.freeze({
  start: 'start',
  data: 'success',
  error: 'error'
})

const intialState = {
  loading: false,
  data: null,
  error: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.start:
      return { ...state, loading: true, error: null }
    case actions.success:
      return { ...state, loading: false, data: action.payload, error: null }
    case actions.error:
      return { ...state, loading: false, error: action.payload }
    default:
      throw new Error(`Action "${action.type}" not supported!`)
  }
}

// To indicate that the component is mounted
const useMounted = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  return mountedRef
}

export const usePromise = (executePromise, deps, options) => {
  const latestPromiseRef = useRef(null)
  const activePromiseRef = useRef(null)
  const mountedRef = useMounted()
  const { isLazy, onSuccess, onError } = options || {}
  const [state, dispatch] = useReducer(reducer, {
    ...intialState,
    loading: !isLazy
  })

  latestPromiseRef.current = executePromise

  const executorRef = useRef(() => {
    const promise = latestPromiseRef.current()

    activePromiseRef.current = promise

    if (!activePromiseRef.current) {
      return null
    }

    if (mountedRef.current) {
      dispatch({ type: actions.start })
    }

    // There can be only one active promise
    const isPromiseActive = () =>
      mountedRef.current && activePromiseRef.current === promise

    const handleSuccess = response => {
      if (!isPromiseActive()) {
        return
      }

      dispatch({ type: actions.success, payload: response })

      if (onSuccess) {
        onSuccess(state)
      }
    }

    const handleError = error => {
      if (!isPromiseActive()) {
        return
      }

      dispatch({ type: actions.error, payload: error })

      if (onError) {
        onError(state)
      }
    }

    promise.then(handleSuccess, handleError)

    return promise
  })

  useEffect(() => {
    if (!isLazy) {
      executorRef.current()
    }
  }, [...(deps || []), isLazy]) // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, execute: executorRef.current }
}
