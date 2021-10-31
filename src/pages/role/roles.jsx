import React from 'react'

import { Card, Input, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { getRoles } from '../../api/role'

const { Search } = Input

class Roles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roles: [],
      pagenum: 1,
      pagesize: 4
    }
  }
  //获取角色数据
  GetRoles = async () => {
    const { data } = await getRoles()
    console.log(data)
    this.setState({
      roles: data
    })
  }
  //设置表格头
  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName'
      },
      {
        title: '角色描述',
        dataIndex: 'roleDesc',
        key: 'roleDesc'
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

  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.GetRoles()
  }

  render() {
    const title = (
      <span>
        <Search enterButton="搜索" placeholder="关键字" style={{ width: 200, margin: '0 15px' }} onSearch={this.onSearch} />
      </span>
    )
    const extra = (
      <Button type="primary" onClick={this.addGood}>
        <PlusOutlined />
        添加
      </Button>
    )
    return (
      <div className="site-card-border-less-wrapper">
        <Card title={title} bordered={false} style={{ width: '100%' }} extra={extra}>
          <Table
            dataSource={this.state.roles}
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
