const menuList = [
  {
    id: '1',
    authName: '首页',
    path: '/home',
    icon: 'PieChartOutlined'
  },
  {
    id: '2',
    authName: '商品管理',
    path: '/products',
    icon: 'AppstoreOutlined',
    children: [
      {
        id: '201',
        authName: '品类管理',
        path: '/category',
        icon: 'BarsOutlined'
      },
      {
        id: '202',
        authName: '商品管理',
        path: '/product',
        icon: 'ToolOutlined'
      }
    ]
  },
  {
    id: '3',
    authName: '用户管理',
    path: '/user',
    icon: 'UserOutlined',
    children: [
      {
        id: '301',
        authName: '用户列表',
        path: '/users',
        icon: 'TeamOutlined'
      },
      {
        id: '302',
        authName: '添加用户',
        path: '/adduser',
        icon: 'UsergroupAddOutlined'
      }
    ]
  },
  {
    id: '4',
    authName: '角色管理',
    path: '/role',
    icon: 'SafetyOutlined',
    children: [
      {
        id: '401',
        authName: '角色列表',
        path: '/roles',
        icon: 'TeamOutlined'
      },
      {
        id: '402',
        authName: '添加角色',
        path: '/addrole',
        icon: 'UserAddOutlined'
      }
    ]
  }
]

export default menuList
