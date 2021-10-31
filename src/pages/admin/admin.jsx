import React from 'react'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import { Redirect, Route, Switch } from 'react-router-dom'

// 路由引入
import Home from '../home/index'
import Category from '../category/index'
import Product from '../product/index'
import Users from '../user/users'
import Adduser from '../user/adduser'
import Roles from '../role/roles'
import Addrole from '../role/addrole'

const { Footer, Sider, Content } = Layout

// 后台管理的路由组件
class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header </Header>
          <Content>
            <Switch>
              <Route path="/home" component={Home} title="首页" />
              <Route path="/category" component={Category} title="分类" />
              <Route path="/product" component={Product} />
              <Route path="/users" component={Users} />
              <Route path="/adduser" component={Adduser} />
              <Route path="/roles" component={Roles} />
              <Route path="/addrole" component={Addrole} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#aaa' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
