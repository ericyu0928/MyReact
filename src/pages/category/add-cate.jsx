import React from 'react'

import { Form, Select, Input, message, Modal } from 'antd'

import { getCates } from '../../api/products'

class Addcate extends React.Component {
  state = { cat_pid: '0', cat_name: '', cates1: [] }

  onCurrencyChange = (value) => {
    if (value) {
      message.error(value)
    }
  }
  // onTextChange = (value) => {
  //   if (value) {
  //     // message.success(value)
  //     console.log(value)
  //   }
  // }
  //获取分类列表
  GetCates = async () => {
    const data = await getCates({
      type: []
      //   pagenum: '',
      //   pagesize: ''
    })
    console.log(data)
    this.setState({
      cates1: data.data
    })
  }

  onFinish = (values) => {
    console.log('Received values of form: ', values)
  }

  componentDidMount() {
    this.GetCates()
  }
  render() {
    const cates = this.state.cates1 || []
    console.log()
    return (
      <Modal
        title="添加分类"
        onOk={this.handleAdd}
        onCancel={() => this.props.hide()}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        visible={this.props.visible === 1 ? true : false}
        destroyOnClose
      >
        <Form onFinish={this.onFinish}>
          <Form.Item>
            <Select style={{ width: '100%' }} onChange={this.onCurrencyChange} defaultValue="">
              {/* <Select.Option value="0">一级分类1</Select.Option>
              <Select.Option value="1">一级分类2</Select.Option>
              <Select.Option value="2">一级分类3</Select.Option> */}
              {cates.map((c) => (
                <Select.Option value={c.cat_id} key={c.cat_id}>
                  {c.cat_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Input placeholder="请输入分类名称" onChange={this.onTextChange}></Input>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Addcate
