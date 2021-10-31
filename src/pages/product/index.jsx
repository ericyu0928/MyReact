import React from 'react'
import './index.less'

import { Switch, Route, Redirect } from 'react-router-dom'

import GoodHome from './goodHome'
import GoodDetail from './goodDetail'
import AddGood from './addGood'

// import LinkButton from '../../components/link-button'
// import { Card, Table } from 'antd'

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Switch>
        <Route path="/product" component={GoodHome} exact></Route>
        <Route path="/product/detail" component={GoodDetail}></Route>
        <Route path="/product/addgood" component={AddGood}></Route>
        <Redirect to="/product" />
      </Switch>
    )
  }
}

export default Product
