import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import routerConfigArray from './modules/index'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'Location',
        },
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  ...routerConfigArray,
  // 404 页面处理
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'not-found',
  //   component: () => import('@/views/404.vue'), // 确保你有一个 404.vue 文件
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
