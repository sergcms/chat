<template>
  <div id="app">
    <div id="nav">
      <template v-if="!token">
        <router-link class="link" to="/login" >Login</router-link>
        <router-link class="link" to="/register" >Register</router-link>
      </template>

      <template v-if="token">
        <button type="button">Create public chat</button>
        <div class="user-info">
          login: <span class="user-name"><strong>{{ name }}</strong></span>
          <span class="logout" v-on:click="logout()">Logout</span>
        </div>
      </template>

    </div>
    <router-view/>
  </div>
</template>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px; 
  }
  .link + .link {
    margin-left: 25px;
  }
  .user-info {
    margin: auto;
    width: 1200px;
    display: flex;
    justify-content: flex-end;
  }
  .user-name {
    padding-left: 10px;
  }
  .logout {
    margin-left: 30px;
    cursor: pointer;
  }
</style>

<script>
import router from "./router";
// import VueRouter from 'vue-router';
import store from './store.js';

router.beforeEach((to, from, next) => {
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  if (to.meta.requiresAuth) {
    if (!store.getters.getToken) {
      next('/login');
      this.$store.dispatch('logout');
    } else {
      // if ()

      next();
    }
  } else {
    next();
  }
});

export default {
  data: function () {
    return {
      // token: '',
      // name: '',
    }
  },

  created () {
    router.push("/login");
  },

  computed: {
    token () {
      return this.$store.getters.getToken
    },
    name () {
      return this.$store.getters.getUser.name
    },

  },

  mounted () {
  },

  methods: {

    logout: function () {
      return this.$store.dispatch('logout');
    }
  }
}
</script>

