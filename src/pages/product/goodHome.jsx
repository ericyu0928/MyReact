import React from 'react'
import './index.less'

import LinkButton from '../../components/link-button'
import { Card, Table, Input, Button, Select, Popconfirm, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { getGoods, delGood, getGood } from '../../api/products'

import AddGood from './addGood'
import GoodDetail from './goodDetail'

const Option = Select.Option
const { Search } = Input

class GoodHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goods: [
        {
          goods_id: 144,
          goods_name: 'asfdsd',
          goods_price: 1,
          goods_number: 1,
          goods_weight: 1,
          goods_state: null,
          add_time: 1512954923,
          upd_time: 1512954923,
          hot_mumber: 0,
          is_promote: false
        }
      ],
      pagenum: 1,
      pagesize: 4,
      searchValue: '',
      visible: 0,
      goodInfo: {}
    }
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'goods_name',
        key: 'goods_name'
      },
      {
        title: '商品重量',
        dataIndex: 'goods_weight',
        key: 'goods_weight'
      },
      {
        title: '价格',
        dataIndex: 'goods_price',
        // key: 'goods_price'
        render: (goods_price) => '¥' + goods_price + '.00'
      },
      {
        width: 90,
        title: '状态',
        dataIndex: 'is_promote',
        // key: 'is_promote'
        render: (is_promote) => {
          return (
            <span>
              <Button type="primary" size="small">
                下架
              </Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        width: 90,
        title: '操作',
        dataIndex: 'goods_id',
        render: (goods_id) => (
          <span>
            <LinkButton onClick={() => this.setGood(goods_id)}>详情</LinkButton>
            <Popconfirm title="确定要删除这件商品吗?" onConfirm={() => this.confirm(goods_id)} onCancel={this.cancel} okText="删除" cancelText="取消">
              <LinkButton>删除</LinkButton>
            </Popconfirm>
          </span>
        )
      }
    ]
  }

  confirm = (e) => {
    console.log(e)
    this.DelGood(e)
  }

  onChange = (page, pageSize) => {
    this.setState(
      {
        pagenum: page,
        pagesize: pageSize
      },
      () => {
        this.GetGoods()
      }
    )
  }

  onSearch = (value) => {
    this.setState(
      (preState) => {
        preState.searchValue = value
      },
      () => {
        this.GetGoods()
      }
    )
  }

  GetGoods = async () => {
    const { data } = await getGoods({
      query: this.state.searchValue,
      pagenum: this.state.pagenum,
      pagesize: this.state.pagesize
    })
    console.log(data)
    this.setState({
      goods: data.goods,
      total: data.total
    })
  }

  DelGood = async (id) => {
    const { meta } = await delGood(id)
    if (meta.status === 200) {
      this.GetGoods()
      message.success(meta.msg)
    } else {
      message.success(meta.msg)
    }
  }

  addGood = () => {
    this.setState({
      visible: 1
    })
  }
  //打开详情页
  setGood = async (c) => {
    //获取当前商品的数据
    const { data, meta } = await getGood(c)
    console.log(data)
    if (!data) {
      message.error(meta.msg)
    }
    this.setState({
      visible: 2,
      goodInfo: data
    })
  }
  showSetGood = (flag) => {
    if (flag === 2) {
      return <GoodDetail visible={this.state.visible} hide={this.handleCancel} refresh={this.GetGoods} goodInfo={this.state.goodInfo}></GoodDetail>
    }
  }

  //隐藏对话框
  handleCancel = () => {
    this.setState({
      visible: 0
    })
    this.GetGoods()
  }

  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.GetGoods()
  }
  render() {
    const title = (
      <span>
        <Select value="1">
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
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
            dataSource={this.state.goods}
            columns={this.columns}
            rowKey="goods_id"
            bordered
            pagination={{ defaultPageSize: this.state.pagesize, showQuickJumper: true, total: this.state.total, onChange: this.onChange }}
          />
        </Card>
        <AddGood visible={this.state.visible} hide={this.handleCancel} refresh={this.GetGoods}></AddGood>
        {/* <GoodDetail visible={this.state.visible} hide={this.handleCancel} refresh={this.GetGoods} goodInfo={info}></GoodDetail> */}
        {this.showSetGood(this.state.visible)}
      </div>
    )
  }
}

export default GoodHome
