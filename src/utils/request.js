// 引入axios
import axios from 'axios'
// import qs from 'qs'
import local from '../utils/local.js'
import { API } from '../config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 公共地址
// axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1'
axios.defaults.baseURL = API
// 设置超时
axios.defaults.timeout = 10000

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  NProgress.start()
  // 在发送请求之前做些什么
  const token = local.get('token')
  if (token) {
    config.headers.Authorization = token
    // config.headers.token = token
  }
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  NProgress.done()
  // 对响应数据做点什么
  return response
})

// 对axios进行封装
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          // 统一处理报错
          reject(err)
        })
    })
  },
  post(url, query) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, query)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          // 统一处理报错
          reject(err)
        })
    })
  },
  put(url, query) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, query)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          // 统一处理报错
          reject(err)
        })
    })
  },
  delete(url, data) {
    // console.log(params)
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: url,
        data
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          // 统一处理报错
          reject(err)
        })
    })
  }
}
