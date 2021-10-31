import React from 'react'
import './index.less'

import LinkButton from '../../components/link-button'
import { Card, Button, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import Addcate from './add-cate'
import Setcate from './set-cate'

import { getCates, setCate } from '../../api/products'
// const { Search } = Input

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [
        {
          cat_id: 5866,
          cat_name: '衣服',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: 5867,
              cat_name: '上衣',
              cat_pid: 5866,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 5868,
                  cat_name: 'T恤',
                  cat_pid: 5867,
                  cat_level: 2,
                  cat_deleted: false
                },
                {
                  cat_id: 5881,
                  cat_name: '侵权',
                  cat_pid: 5867,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            }
          ]
        },
        {
          cat_id: 5869,
          cat_name: '裤子',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: 5874,
              cat_name: 't2',
              cat_pid: 5869,
              cat_level: 1,
              cat_deleted: false
            },
            {
              cat_id: 5878,
              cat_name: '牛仔裤',
              cat_pid: 5869,
              cat_level: 1,
              cat_deleted: false
            }
          ]
        },

        {
          cat_id: 5870,
          cat_name: 'bbbb',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false
        },
        {
          cat_id: 5871,
          cat_name: 'vvvv',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false
        },
        {
          cat_id: 5872,
          cat_name: 'ggg',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false
        },
        {
          cat_id: 5875,
          cat_name: 'test001',
          cat_pid: 0,
          cat_level: 0,
          cat_deleted: false,
          children: [
            {
              cat_id: 5876,
              cat_name: 'test002',
              cat_pid: 5875,
              cat_level: 1,
              cat_deleted: false,
              children: [
                {
                  cat_id: 5877,
                  cat_name: 'test003',
                  cat_pid: 5876,
                  cat_level: 2,
                  cat_deleted: false
                }
              ]
            }
          ]
        }
      ], //一级分类列表
      visible: 0, //0:不显示,1:显示添加,2:显示更改
      cat_name: ''
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  // 初始化列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'cat_name',
        key: 'name'
      },
      {
        title: '操作',
        width: '20%',
        // dataIndex: 'cat_id',
        render: (categories) => (
          <span>
            <LinkButton onClick={() => this.setCates(categories)}>修改分类</LinkButton>
          </span>
        )
      }
    ]
  }

  componentDidMount() {
    this.GetCates()
  }

  GetCates = async () => {
    const data = await getCates({
      // type: [1]
      //   pagenum: '',
      //   pagesize: ''
    })
    console.log(data)
    this.setState({ categories: data.data })
  }

  addCates = () => {
    this.setState({
      visible: 1
    })
    this.showAdd()
  }
  showAdd = (flag) => {
    if (flag) {
      return <Addcate visible={this.state.visible} hide={this.handleCancel} cates={this.state.categories}></Addcate>
    }
  }
  setCates = (c) => {
    this.c = c
    this.setState({
      visible: 2
    })
  }
  //添加分类
  handleAdd = () => {
    //1.0 隐藏对话框
    this.handleCancel()
    //2.0 发送请求

    //3.0 重新显示列表
    this.GetCates()
  }
  //编辑分类
  handleSet = async () => {
    //1.0 隐藏对话框
    this.handleCancel()
    //2.0 发送请求
    if (this.state.cat_name) {
      const data = await setCate(this.c.cat_id, { cat_name: this.state.cat_name })
      console.log(data, this.c.cat_id)
    }
    // this.formRef.current.resetFields()
    //3.0 重新显示列表
    this.GetCates()
  }
  //隐藏对话框
  handleCancel = () => {
    this.setState({
      visible: 0
    })
    // this.props.history.go()
  }
  //编辑分类输入内容
  onTextChange = (e) => {
    if (e.target.value) {
      this.setState({
        cat_name: e.target.value
      })
    }
  }
  //下拉框选择
  onCurrencyChange = (value) => {
    if (value) {
      message.error(value)
    }
  }

  render() {
    const c = this.c || {}
    console.log(c)
    return (
      <div className="site-card-border-less-wrapper">
        <Card
          title="分类列表"
          extra={
            <Button type="primary" onClick={this.addCates}>
              <PlusOutlined />
              添加
            </Button>
          }
          bordered={false}
          style={{ width: '100%' }}
        >
          <Table rowKey="cat_id" bordered dataSource={this.state.categories} columns={this.columns} scroll={{ y: 360 }} pagination={{ defaultPageSize: 3, showQuickJumper: true }} />

          {/*添加的对话框*/}
          {/* <Modal title="添加分类" visible={this.state.visible === 1} onOk={this.handleAdd} onCancel={this.handleCancel}>
            <Form onFinish={this.onFinish}>
              <Form.Item>
                <Select style={{ width: '100%' }} onChange={this.onCurrencyChange} defaultValue="0">
                  <Select.Option value="0">一级分类1</Select.Option>
                  <Select.Option value="1">一级分类2</Select.Option>
                  <Select.Option value="2">一级分类3</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Input placeholder="请输入分类名称" onChange={this.onTextChange}></Input>
              </Form.Item>
            </Form>
          </Modal> */}

          {/*编辑的对话框*/}
          {/* <Modal title="编辑分类" visible={this.state.visible === 2} onOk={this.handleSet} onCancel={this.handleCancel} destroyOnClose> */}
          {/* </Modal> */}
        </Card>

        {/* <Addcate visible={this.state.visible} hide={this.handleCancel} cates={c}></Addcate> */}
        {this.showAdd(this.state.visible)}
        <Setcate cateName={c.cat_name} cateId={c.cat_id} visible={this.state.visible} hide={this.handleCancel} refresh={this.GetCates} />
      </div>
    )
  }
}

export default Category
