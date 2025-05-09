import Layout from '@/layout/index.vue'

export default [
  {
    path: '/post',
    name: 'post',
    meta: {
      title: '岗位管理',
      icon: 'Postcard',
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'postIndex',
        meta: {
          title: '岗位列表',
          icon: 'Setting',
        },
        component: () => import('@/views/post/index.vue'),
      },
    ],
  },
]
