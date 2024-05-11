import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

//createRouter 创建路由实例
//路由模式
//  1.history createWebHistory 不带#  多
//  2.hash默认  createWebHashHistory 带#

// import.meta.env.BASE_URL  vite中的环境变量 vite.config.js base配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

//登录访问拦截 =>默认是直接放行
//根据返回值 觉得放行还是拦截
//返回值
//  1.undefined /true 直接放行
//  2.false 拦回from的地址页面
//  3.具体路径或路径对象 拦截到对应的地址
//    '/login'  {name:'login'}
router.beforeEach((to) => {
  //如果没有token且访问的是非登录页,拦截到登录 其他情况放行
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})

export default router
