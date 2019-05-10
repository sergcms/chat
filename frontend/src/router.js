import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import store from './store'

Vue.use(Router)

// export default new Router(
const router = new Router({
  // base: process.env.BASE_URL,
  mode: 'history',

  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "chat" */ './views/Chat.vue'),
    
    },
    {
      path: '/chat/room/id',
      name: 'room',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "chat" */ './views/Chat.vue'),
    },
    // {
    //   path: '*',
    //   redirect: '/login'
    // },
  ]
});

router.beforeEach((to, from, next) => {
  // parse token if exists
  if (!store.getters.hasUserId && store.getters.getToken) {
    store.dispatch('parseToken', { token: store.getters.getToken })
  }

  // redirect to login if unauthorized
  if (to.meta.requiresAuth && !store.getters.hasUserId) {
    next('/login')
  } else {
    next()
  }
});

export default router;