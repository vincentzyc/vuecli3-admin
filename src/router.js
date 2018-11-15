import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/ad',
            name: 'ad',
            component: () => import('@/views/Ad.vue')
        },
        {
            path: '*',
            name: '404',
            component: () => import("@/components/404.vue")
        },
    ]
})