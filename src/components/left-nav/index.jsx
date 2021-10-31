import React from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import * as Icons from '@ant-design/icons'

import menuList from '../../config/menuConfig.js'

const { SubMenu } = Menu

class LeftNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // 根据menu的数据数组生成对应标签
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    // eslint-disable-next-line array-callback-return
    return menuList.map((item) => {
      const icon = React.createElement(Icons[item.icon], {
        style: { fontSize: '16px' }
      })
      if (!item.children) {
        return (
          <Menu.Item key={item.path} icon={icon}>
            <Link to={item.path}>{item.authName}</Link>
          </Menu.Item>
        )
      } else {
        const cItem = item.children.find((cItem) => cItem.path === path)
        if (cItem) {
          this.openKey = item.path
        }
        return (
          <SubMenu key={item.path} icon={icon} title={item.authName}>
            {this.getMenuNodes(item.children)}
            {/* <Menu.Item key="/category" icon={<BarsOutlined />} title="品类管理">
              <Link to="/category">品类管理</Link>
            </Menu.Item>
            <Menu.Item key="/product" icon={<ToolOutlined />} title="商品管理">
              <Link to="/product">商品管理</Link>
            </Menu.Item> */}
          </SubMenu>
        )
      }
    })
  }

  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
    const path = this.props.location.pathname

    const openKey = this.openKey
    return (
      <div className="aside">
        <Link to="/home" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h2>React 后台</h2>
        </Link>

        <div style={{ width: '100%' }}>
          <Menu selectedKeys={[path]} defaultOpenKeys={[openKey]} mode="inline" theme="dark">
            {/* <Menu.Item key="/home" icon={<PieChartOutlined />}>
              <Link to="/home">首页</Link>
            </Menu.Item>

            <SubMenu key="/products" icon={<AppstoreOutlined />} title="商品管理">
              <Menu.Item key="/category" icon={<BarsOutlined />} title="品类管理">
                <Link to="/category">品类管理</Link>
              </Menu.Item>
              <Menu.Item key="/product" icon={<ToolOutlined />} title="商品管理">
                <Link to="/product">商品管理</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="3" icon={<UserOutlined />} title="用户管理">
              <Menu.Item key="/users">
                <Link to="/users">用户列表</Link>
              </Menu.Item>
              <Menu.Item key="3-2">添加用户</Menu.Item>
            </SubMenu>

            <SubMenu key="4" icon={<SafetyOutlined />} title="角色管理">
              <Menu.Item key="4-1">角色列表</Menu.Item>
              <Menu.Item key="4-2">添加角色</Menu.Item>
            </SubMenu> */}
            {this.menuNodes}
          </Menu>
        </div>
      </div>
    )
  }
}

export default withRouter(LeftNav)
