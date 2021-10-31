import React from 'react'
import './index.less'

import EditForm from './components/editForm'

// import LinkButton from '../../components/link-button'
import { Modal } from 'antd'

class GoodDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const info = this.props.goodInfo
    return (
      <div>
        <Modal
          title="编辑商品"
          okText="确认修改"
          cancelText="取消修改"
          visible={this.props.visible === 2 ? true : false}
          onOk={this.handleAdd}
          onCancel={() => this.props.hide()}
          destroyOnClose
          width="700px"
        >
          <EditForm gInfo={info}></EditForm>
        </Modal>
      </div>
    )
  }
}

export default GoodDetail
