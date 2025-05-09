import Layout from '@/layout/index.vue'

export default [
  {
    path: '/department',
    name: 'department',
    meta: {
      title: '部门管理',
      icon: 'Document',
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'departmentIndex',
        meta: {
          title: '部门列表',
          icon: 'User',
        },
        component: () => import('@/views/department/index.vue'),
      },
    ],
  },
]
