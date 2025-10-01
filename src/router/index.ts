import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '储能医生 - 让沉默储能柜重新跑起来',
      description: '专业解决储能柜断连问题，30分钟让死柜复活'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
    meta: {
      title: '产品中心 - 储能医生',
      description: 'DTU硬件设备和云平台解决方案'
    }
  },
  {
    path: '/case',
    name: 'CaseList',
    component: () => import('../views/CaseList.vue'),
    meta: {
      title: '成功案例 - 储能医生',
      description: '查看储能医生成功救援案例'
    }
  },
  {
    path: '/case/:id',
    name: 'CaseDetail',
    component: () => import('../views/CaseDetail.vue'),
    meta: {
      title: '案例详情 - 储能医生',
      description: '储能柜救援案例详情'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router