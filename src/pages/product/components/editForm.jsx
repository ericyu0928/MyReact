import React from 'react'

// import LinkButton from '../../components/link-button'
import { Form, Input, Upload, Button, Checkbox, InputNumber, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { API } from '../../../config'

import { addGood } from '../../../api/products'

import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class AddForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contentText: '',
      headers: { authorization: window.localStorage.getItem('token') },
      editorState: '',
      fileList: []
    }
  }

  onEditorStateChange = (editorState) => {
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    console.log(html)
    this.setState({
      contentText: html
    })
  }

  // transformHtmlToDraftState = (html = '') => {
  //   return EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(html)))
  // }

  onFinish = (values) => {
    console.log('Success:', values)
    const params = {
      goods_name: values.goods_name,
      goods_cat: values.goods_cat.toString(),
      goods_price: values.goods_price,
      goods_number: values.goods_number,
      goods_weight: values.goods_weight,
      goods_introduce: this.state.contentText,
      pics: values.pics ? [values.pics[0].response.data.tmp_path] : [],
      attrs: []
    }
    console.log(params)
    this.AddGood(params)
    this.props.close()
    this.props.fresh()
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  normFile = (e) => {
    console.log('Upload event:', e)

    if (Array.isArray(e)) {
      return e
    }

    const arr = []
    arr.push(e.fileList[e.fileList.length - 1])
    return e && arr
    // return e && e.fileList
  }

  onChange = (checkedValues) => {
    console.log('checked = ', checkedValues)
  }

  AddGood = async (params) => {
    const { data, meta } = await addGood(params)
    console.log(data)
    message.success(meta.msg)
  }
  formRef = React.createRef()
  componentDidMount() {
    const { goods_name, goods_number, goods_price, goods_weight, pics, goods_introduce, goods_cat } = this.props.gInfo
    // console.log(pics[0])
    // const { pics_mid_url } = pics[0]
    let fileList = []
    this.formRef.current.setFieldsValue({
      goods_name,
      goods_number,
      goods_price,
      goods_weight,
      // eslint-disable-next-line no-undef
      // pics: [{ name: pics_mid_url, url: pics_mid_url }],

      goods_introduce,
      goods_cat
    })
    if (pics && pics.length > 1) {
      fileList = pics.map((pic, index) => ({
        uid: -index,
        name: pic,
        status: 'done',
        url: API + pic
      }))
    }
    this.setState({
      // editorState: this.transformHtmlToDraftState(goods_introduce)
      fileList
    })
  }
  render() {
    const options = [
      { label: '1s', value: '1' },
      { label: '2s', value: '2' },
      { label: '3s', value: '3' }
    ]

    return (
      <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed} ref={this.formRef}>
        <Form.Item label="商品名称" name="goods_name" rules={[{ required: true, message: '请输入商品名称' }]}>
          <Input></Input>
        </Form.Item>

        <Form.Item label="商品名称" name="goods_cat" rules={[{ required: true, message: '请输入商品名称' }]}>
          <Checkbox.Group options={options} onChange={this.onChange} />
        </Form.Item>

        <Form.Item label="商品价格" name="goods_price" rules={[{ required: true, message: '请输入商品价格' }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="商品数量" name="goods_number" rules={[{ required: true, message: '请输入商品数量' }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="商品重量" name="goods_weight" rules={[{ required: true, message: '请输入商品重量' }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="上传图片" name="pics" valuePropName="fileList" getValueFromEvent={this.normFile}>
          <Upload
            name="file"
            action={`${API}/upload`}
            listType="picture-card"
            headers={this.state.headers}
            maxCount={1}
            fileList={this.state.fileList}
            beforeUpload={(file) => {
              const ext = file.name.split('.')[1]
              if (!['jpg', 'jpeg'].includes(ext)) {
                message.error('图片格式错误')
                return Upload.LIST_IGNORE
              }
            }}
          >
            <Button icon={<UploadOutlined />}></Button>
          </Upload>
        </Form.Item>

        <Form.Item label="商品介绍" name="desc">
          <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            onEditorStateChange={this.onEditorStateChange}
            editorState={this.state.editorState}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType={onsubmit}>
            添加
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default AddForm
