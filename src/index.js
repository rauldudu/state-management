import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { TodoList } from './components/TodoList/TodoList'
import { Todo } from './components/Todo/Todo'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root')
)
