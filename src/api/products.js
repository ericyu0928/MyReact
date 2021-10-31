// 引入文件
import req from '../utils/request.js'

// 导出获取所有品类的功能函数
export function getCates(query) {
  return req.get('/categories', query)
}

// // 导出获取所有品类的功能函数
// export function getCates(query) {
//   return req.get('/categories', query)
// }

// 导出编辑品类的功能函数
export function setCate(params, query) {
  return req.put(`/categories/${params}`, query)
}

// 导出获取所有商品的功能函数
export function getGoods(query) {
  return req.get('/goods', query)
}

// 导出获取添加商品的功能函数
export function addGood(query) {
  return req.post('goods', query)
}

// 导出获取添加商品的功能函数
export function delGood(params) {
  return req.delete(`goods/${params}`, '')
}

// 导出获取单个商品的功能函数
export function getGood(params) {
  return req.get(`goods/${params}`, '')
}
