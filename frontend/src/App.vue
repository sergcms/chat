<template>
  <div id="app">
    <div id="nav">
      <template v-if="!token">
        <router-link class="link" to="/login" >Login</router-link>
        <router-link class="link" to="/register" >Register</router-link>
      </template>
    </div>

    <router-view/>
  </div>
</template>

<style scoped>
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
</style>

<script>
import router from "./router";
import store from './store.js';

export default {
  data: function () {
    return {
      // token: '',
      // name: '',
    }
  },

  components: {
    
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

