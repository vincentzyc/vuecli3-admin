import { easeout } from '@/utils/dom';
import { setSessionStorage } from '@/utils/storage';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const checkLogin = () => window.location.href.includes('token=') ? "/login" : "/welcome";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: checkLogin()
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
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
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

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next();
    return;
  }
  if (localStorage.getItem("creativeUserInfo")) {
    next();
  } else {
    setSessionStorage("backUrl", window.location.href);
    next('/login');
  }
})

router.afterEach((to, from) => {
  if (to.name === from.name) return;
  if (to.name === 'hotidea' && from.name === 'hotideaDetail') return
  if (window.dom_container) {
    easeout(window.dom_container, 0, 5);
  }
  const _paq = window['_paq'] || [];
  _paq.push(['setCustomUrl', to.path]);
  _paq.push(['trackPageView']);
})

export default router
