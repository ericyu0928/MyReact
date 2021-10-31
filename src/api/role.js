// 引入文件
import req from '../utils/request.js'

// 导出登录的功能函数
export function getRoles(query) {
  return req.get('roles', query)
}
