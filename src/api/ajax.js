import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {
  if (type === 'GET') {
    // 发送get请求
    return axios.get(url, {
      params: {
        data
      }
    })
  } else {
    // 发送post请求
    return axios.post(url, data)
  }
}
