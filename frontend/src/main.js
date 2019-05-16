import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Cookies from 'js-cookie'
import Echo from 'laravel-echo'
import VueSwal from 'vue-swal'

Vue.config.productionTip = false;

window.io = require('socket.io-client');
// Have this in case you stop running your laravel echo server
if (typeof io !== 'undefined') {
  window.Echo = new Echo({
    broadcaster: 'socket.io',
    // host: window.location.hostname + :'6001',
    host: 'http://chat.test' + ':6001',
    auth: {
      headers: {
        Authorization: 'Bearer ' + store.getters.getToken,
      },
    },
  });
}

new Vue({ 
        axios, 
        router, 
        store,
        Cookies,
        Echo, 
        VueSwal,
        render: h => h(App) 
    }).$mount('#app')

