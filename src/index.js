import React, { useRef, useReducer, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import NotificationSystem from 'react-notification-system'
import { NotificationContext } from './contexts/Notification'
import { queryClient } from './services/queryClient'
import { Provider } from 'react-redux'
import { configureStore } from './store/store'
import { TodoList } from './components/TodoList/TodoList'
import { Todo } from './components/Todo/Todo'
import { AddTodo } from './components/AddTodo/AddTodo'

import './index.css'

const App = () => {
  const notificationRef = useRef()
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const notificationRefCallback = useCallback(ref => {
    notificationRef.current = ref
    forceUpdate()
  }, [])

  return (
    <React.StrictMode>
      <Provider store={configureStore()}>
        <QueryClientProvider client={queryClient}>
          <NotificationContext.Provider value={notificationRef.current}>
            <main>
              <Router>
                <Route path="/" exact component={TodoList} />
                <Route path="/todos/new" exact component={AddTodo} />
                <Route
                  path="/todo/:id"
                  component={({ match }) => <Todo id={match.params.id} />}
                />
              </Router>
            </main>
          </NotificationContext.Provider>
          <NotificationSystem ref={notificationRefCallback} />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
