import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import store from './store'
// import Vuex from 'vuex'

Vue.use(Router)

// export default new Router(
const router = new Router({
  // base: process.env.BASE_URL,

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
      path: '*',
      redirect: '/login'
    },
    {
      path: '/chat/room/id',
      name: 'room',
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "chat" */ './views/Chat.vue'),
    },
  ]
});

router.beforeEach((to, from, next) => {
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  // if (store.getters.getToken) {
  //   try {
  //     store.dispatch('save', { token : store.getters.getToken });
  //     // next('/chat');
  //   }
  //   catch (e) {
  //     next('/login');
  //   }
  // }
    
  if (to.meta.requiresAuth) {
    if (!store.getters.getToken) {
      next('/login');
      store.dispatch('logout');
    } else {
      // save info from token
      // store.dispatch('save', store.getters.getToken);
      // next('/chat');
      next();
    }
  } else {
    next();
  }
});

export default router;