import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';

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
        path: 'index',
        name: 'userIndex',
        meta: {
          title: '用户列表',
          icon: 'User',
        },
        component: () => import('@/views/user/index.vue'),
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
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  // 404 页面处理
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'not-found',
  //   component: () => import('@/views/404.vue'), // 确保你有一个 404.vue 文件
  // },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
