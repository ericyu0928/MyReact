import React from 'react'

import { Modal } from 'antd'
import LinkButton from '../link-button/index'

import local from '../../utils/local'
import menuList from '../../config/menuConfig.js'

import { formateDate } from '../../utils/dateUtils'
import { withRouter } from 'react-router-dom'
import './index.less'
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: local.get('username'),
      curTime: formateDate(Date.now())
    }
  }
  componentDidMount() {
    this.getTime()
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach((item) => {
      if (item.path === path) {
        title = item.authName
      } else if (item.children) {
        const cItem = item.children.find((cItem) => cItem.path === path)
        // const cItem = item.children.find((cItem) => path.indexOf(cItem.key) === 0)
        if (cItem) {
          title = cItem.authName
        }
      }
    })
    return title
  }
  // 退出登录
  logout = () => {
    Modal.confirm({
      content: '确认退出吗?',
      onOk: () => {
        console.log('OK')
        //清除本地token
        local.cls()
        //跳转到login
        this.props.history.replace('/login')
      },
      onCancel: () => {
        console.log('Cancel')
      }
    })
  }

  getTime = () => {
    this.intervalId = setInterval(() => {
      const curTime = formateDate(Date.now())
      this.setState({ curTime })
    }, 1000)
  }

  render() {
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{this.state.user}</span>
          {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{this.state.curTime}</span>
            <img src="" alt="" />
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
