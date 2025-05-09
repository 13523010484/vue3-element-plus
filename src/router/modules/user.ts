import Layout from '@/layout/index.vue'

export default [
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'User',
    },
    component: Layout,
    children: [
      {
        path: 'admin',
        name: 'admin',
        meta: {
          title: '部门管理员',
          icon: 'User',
        },
        component: () => import('@/views/user/admin.vue'),
      },
      {
        path: 'operate',
        name: 'operate',
        meta: {
          title: '部门操作员',
          icon: 'User',
        },
        component: () => import('@/views/user/operate.vue'),
      },
      {
        path: 'userInfo',
        name: 'userInfo',
        meta: {
          title: '用户信息',
          icon: 'User',
        },
        component: () => import('@/views/user/userInfo.vue'),
      },
    ],
  },
]
