import { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import local from './utils/local'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          {/*只匹配其中一个*/}
          <Route path="/login" render={() => (local.get('token') ? <Redirect to="/" /> : <Login />)}></Route>
          <Route path="/" render={() => (local.get('token') ? <Admin /> : <Redirect to="/login" />)}></Route>
        </Switch>
      </HashRouter>
    )
  }
}

export default App
