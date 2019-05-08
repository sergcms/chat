import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Cookies from 'js-cookie'
// import VueAxios from 'vue-axios'

Vue.config.productionTip = false

new Vue({ 
        // VueAxios, 
        axios, 
        router, 
        store,
        Cookies, 
        render: h => h(App) 
    }).$mount('#app')

