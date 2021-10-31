import React from 'react'

import { Card, Input, Button, Table } from 'antd'
import { EditOutlined, SearchOutlined } from '@ant-design/icons'

import { getUsers } from '../../api/user'

const { Search } = Input

class Roles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      pagenum: 1,
      pagesize: 5,
      query: '',
      selectedRowKeys: [],
      role: {} //选中的对象
    }
  }
  //获取角色数据
  GetUsers = async () => {
    const { data } = await getUsers({
      query: this.state.query,
      pagenum: this.state.pagenum,
      pagesize: this.state.pagesize
    })
    console.log(data)
    this.setState({
      users: data.users,
      total: data.total
    })
  }
  //设置表格头
  initColumns = () => {
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '身份级别',
        dataIndex: 'role_name',
        key: 'role_name'
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: '电话',
        dataIndex: 'mobile',
        key: 'mobile'
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email'
      }
      // {
      //   title: '价格',
      //   dataIndex: 'goods_price',
      //   // key: 'goods_price'
      //   render: (goods_price) => '¥' + goods_price + '.00'
      // },
      // {
      //   width: 90,
      //   title: '状态',
      //   dataIndex: 'is_promote',
      //   // key: 'is_promote'
      //   render: (is_promote) => {
      //     return (
      //       <span>
      //         <Button type="primary" size="small">
      //           下架
      //         </Button>
      //         <span>在售</span>
      //       </span>
      //     )
      //   }
      // },
      // {
      //   width: 90,
      //   title: '操作',
      //   dataIndex: 'goods_id',
      //   render: (goods_id) => (
      //     <span>
      //       <LinkButton onClick={() => this.setGood(goods_id)}>详情</LinkButton>
      //       <Popconfirm title="确定要删除这件商品吗?" onConfirm={() => this.confirm(goods_id)} onCancel={this.cancel} okText="删除" cancelText="取消">
      //         <LinkButton>删除</LinkButton>
      //       </Popconfirm>
      //     </span>
      //   )
      // }
    ]
  }
  //切换页面
  onChange = (page, pageSize) => {
    this.setState(
      {
        pagenum: page,
        pagesize: pageSize
      },
      () => {
        this.GetUsers()
      }
    )
  }
  // 多选框选中
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  //对指定行的操作
  onRow = (role) => {
    return {
      onClick: (event) => {
        this.setState({
          role
        })
      }
    }
  }

  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.GetUsers()
  }

  render() {
    const title = (
      <span>
        <Search enterButton="搜索" placeholder="关键字" style={{ width: 200, margin: '0 15px' }} onSearch={this.onSearch} prefix={<SearchOutlined style={{ color: '#D9D9D9' }} />} />
      </span>
    )
    const extra = (
      <Button type="primary" onClick={this.addGood} disabled={!this.state.role.id}>
        <EditOutlined />
        编辑
      </Button>
    )

    const rowSelection = {
      type: 'radio',
      selectedRowKeys: [this.state.role.id],
      onChange: this.onSelectChange
    }
    return (
      <div className="site-card-border-less-wrapper">
        <Card title={title} bordered={false} style={{ width: '100%' }} extra={extra}>
          <Table
            onRow={this.onRow}
            rowSelection={rowSelection}
            dataSource={this.state.users}
            columns={this.columns}
            rowKey="id"
            bordered
            pagination={{ defaultPageSize: this.state.pagesize, showQuickJumper: true, total: this.state.total, onChange: this.onChange }}
          />
        </Card>
      </div>
    )
  }
}

export default Roles
