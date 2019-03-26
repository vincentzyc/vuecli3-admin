import Vue from 'vue'
import Router from 'vue-router'

const vm = new Vue();

Vue.use(Router)

const router = new Router({
	// mode: 'history',
	routes: [{
			path: "/",
			redirect: "/home"
		},
		{
			path: "/login",
			name: 'login',
			component: () => import("./views/login.vue")
		},
		{
			path: "/home",
			component: () => import("./components/layout"),
			children: [{
					path: '/',
					name: 'home',
					component: () => import('./views/home.vue')
				},
				{
					path: '/ad',
					name: 'ad',
					component: () => import('./views/ad.vue')
				},
				{
					path: '/easytable',
					name: 'easytable',
					component: () => import('./views/ele-easy-table-demo.vue')
				}
			]
		},
		{
			path: '*',
			name: '404',
			component: () => import("./views/404.vue")
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.name === "login") {
		next();
		return;
	}
	localStorage.getItem("loanuser") ? next() : next('/login');
})

router.afterEach(() => {
	if (window.dom_container) {
		vm.$util.easeout(window.dom_container, 0, 5);
	}
})

export default router