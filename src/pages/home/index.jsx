import React from 'react'
import './index.less'

import { Card } from 'antd'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="site-card-border-less-wrapper">
        <Card title="欢迎来到后台" bordered={false} style={{ width: '100%' }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    )
  }
}

export default Home
