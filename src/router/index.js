import Vue from 'vue'
import Router from 'vue-router'
import routerList from './router-list'

const vm = new Vue();
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: routerList
})

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next();
    return;
  }
  localStorage.getItem("userInfo") ? next() : next('/login');
})
router.afterEach(() => {
  if (window.dom_container) {
    vm.$util.easeout(window.dom_container, 0, 5);
  }
})

export default router