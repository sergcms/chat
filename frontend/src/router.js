import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
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
     
    }
  ]
});
