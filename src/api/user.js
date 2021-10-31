// 引入文件
import req from '../utils/request.js'

// 导出登录的功能函数
export function getUsers(query) {
  return req.get('users', query)
}
