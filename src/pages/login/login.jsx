import React, { Component } from 'react'
import './login.less'
import logo from '../../assets/images/logo.png'
import local from '../../utils/local'
import { Redirect } from 'react-router-dom'
// 引入表单
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { login } from '../../api/login'

// 登录的路由组件
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { isAble: false }
  }

  onFinish = (values) => {
    console.log('Success:', values)
    const { username, password } = values
    this.setState({ isAble: false })
    this.Login(username, password)
  }

  // 登录请求
  async Login(username, password) {
    const { data, meta } = await login({ username, password })
    console.log(data)
    if (meta.status === 200) {
      local.set('token', data.token)
      local.set('username', data.username)
      this.setState({ isAble: true })
      message.success(meta.msg)
      // setTimeout(() => {
      //   this.props.history.replace('/')
      // }, 3000)
    } else {
      this.setState({ isAble: true })
      message.error(meta.msg)
      setTimeout(() => {
        this.setState({ isAble: false })
      }, 3000)
    }
  }

  //衍生
  //密码验证
  validatorPWD = (rule, value, callback) => {
    if (!value) {
      return Promise.reject('Please input your Password!')
    } else if (value.length < 4) {
      return Promise.reject('大于4')
    } else if (value.length > 12) {
      return Promise.reject('小于12')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject('请正确输入')
    } else {
      return Promise.resolve()
    }
  }

  render() {
    console.log(123)
    if (local.get('token')) {
      return <Redirect to="/" />
    }
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="" />
          <h1>React项目</h1>
        </div>
        <div className="login-content">
          <h2>用户登录</h2>
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
            <Form.Item
              name="username"
              rules={[
                { required: true, whitespace: true, message: 'Please input your Username!' },
                {
                  min: 4,
                  message: '至少4位'
                },
                { max: 12, message: '至多12位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '英文和数字' }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ validator: this.validatorPWD }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" disabled={this.state.isAble}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login
