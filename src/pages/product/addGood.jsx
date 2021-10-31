import React from 'react'
import './index.less'

// import LinkButton from '../../components/link-button'
import { Modal } from 'antd'

import AddForm from './components/addForm'

class AddGood extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  close = () => {
    this.props.hide()
  }
  render() {
    return (
      <Modal title="添加分类" visible={this.props.visible === 1 ? true : false} onOk={this.handleAdd} onCancel={() => this.props.hide()} destroyOnClose>
        <AddForm close={this.close} fresh={() => this.props.refresh()}></AddForm>
      </Modal>
    )
  }
}

export default AddGood
