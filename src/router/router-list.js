export default [{
		path: "/",
		redirect: () => localStorage.getItem("userInfo") ? "/home" : "/login"
	},
	{
		path: "/login",
		name: 'login',
		component: () => import("@/views/login.vue")
	},
	{
		path: "/home",
		component: () => import("@/components/layout"),
		children: [{
				path: '/',
				name: 'home',
				component: () => import('@/views/home.vue')
			},
			{
				path: '/ad',
				name: 'ad',
				component: () => import('@/views/ad.vue')
			},
			{
				path: '/easytable',
				name: 'easytable',
				component: () => import('@/views/ele-easy-table-demo.vue')
			},
			{
				path: '/tabs',
				name: 'tabs',
				component: () => import('@/views/tabs')
			}, {
				path: '/time-range-picker',
				name: 'timeRangePicker',
				component: () => import('@/views/time-range-picker-demo')
			}
		]
	},
	{
		path: '*',
		name: '404',
		component: () => import("@/views/404.vue")
	}
]