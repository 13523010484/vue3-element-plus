import router from '@/router'
import { useMenuStore } from '@/stores/menu'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const hasToken = sessionStorage.getItem('token')
  const menuStore = useMenuStore()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经登录，重定向到首页
      return next({ path: '/' })
    } else {
      // 确保在访问 length 属性之前，菜单数据已经加载
      if (!menuStore.menuTree) {
        try {
          await menuStore.menuQueryReq()

          // 再次检查菜单数据是否已加载
          if (Array.isArray(menuStore.menuTree) && menuStore.menuTree.length > 0) {
            return next({ ...to, replace: true })
          } else {
            console.error('菜单数据为空！')
            // 清除token并重定向到登录页
            sessionStorage.removeItem('token')
            return next('/login')
          }
        } catch (error) {
          console.error('Failed to load user info or menu:', error)
          // 清除token并重定向到登录页
          sessionStorage.removeItem('token')
          return next('/login')
        }
      } else {
        return next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      return next()
    } else {
      return next('/login')
    }
  }
})
