import React from 'react'
// import PropTypes from 'prop-types'

import { Form, Input, Modal } from 'antd'

import { setCate } from '../../api/products'

class Setcate extends React.Component {
  // static propTypes = {
  //   cateName: PropTypes.string.isRequired
  // }
  state = { cat_pid: '0', cat_name: '', cateName: '' }

  onTextChange = (e) => {
    if (e.target.value) {
      this.setState({
        cat_name: e.target.value
      })
    }
  }

  handleOk = () => {
    if (this.state.cat_name) {
      this.SetCate()
      this.props.refresh()
    }
    this.props.hide()
  }

  SetCate = async () => {
    const data = await setCate(this.props.cateId, { cat_name: this.state.cat_name })
    console.log(data)
  }

  render() {
    console.log(this.state.cateName)
    return (
      <Modal title="编辑分类" onOk={this.handleOk} onCancel={() => this.props.hide()} visible={this.props.visible === 2 ? true : false} destroyOnClose>
        <Form onFinish={this.onFinish}>
          <Form.Item>
            <Input ref="ipt" placeholder={this.props.cateName} onChange={this.onTextChange} />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Setcate
