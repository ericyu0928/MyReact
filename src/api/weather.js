// 引入文件
import req from '../utils/request.js'
// 引入jsonp
// import jsonp from 'jsonp'

// 导出登录的功能函数
export function getWeather(city) {
  return req.post('login', city)
}
