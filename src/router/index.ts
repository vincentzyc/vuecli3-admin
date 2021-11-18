import { easeout } from '@/utils/dom';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: '/home'
  },
  {
    path: "/login",
    name: 'login',
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    name: 'Layout',
    component: () => import("@/components/Layout/index.vue"),
    children: [
      {
        path: '/menu1',
        name: 'Home',
        component: () => import(/* webpackChunkName: "menu1" */ '../views/Home.vue')
      },
      {
        path: '/menu2',
        name: 'About',
        component: () => import(/* webpackChunkName: "menu2" */ '../views/About/index.vue'),
        children: [
          {
            path: '/menu2/submenu1',
            name: 'About1',
            component: () => import('../views/About/About1.vue')
          }
        ]
      },
      {
        path: '/menu3',
        name: 'Welcome',
        component: () => import(/* webpackChunkName: "menu3" */ '../views/Welcome.vue')
      },
    ]
  }, {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import("@/views/404.vue"/* webpackChunkName: "404" */)
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to, from) => {
  if (to.name === from.name) return;
  if (window.dom_container) {
    easeout(window.dom_container, 0, 5);
  }
})

export default router
