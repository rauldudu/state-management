import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from './store/store'
import { TodoList } from './components/TodoList/TodoList'
import { Todo } from './components/Todo/Todo'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <main>
        <Router>
          <Route path="/" exact component={TodoList} />
          <Route
            path="/todo/:id"
            component={({ match, history }) => (
              <Todo id={match.params.id} history={history} />
            )}
          />
        </Router>
      </main>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
