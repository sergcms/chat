<script>
import router from "./router";
import store from './store.js';

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.getters.getToken) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

// if (!store.getters['auth/check'] && store.getters['auth/token']) {
//   try {
//     await store.dispatch('auth/fetchUserBag', { token: store.getters['auth/token'] })
//   } catch (e) { }
// }

</script>

