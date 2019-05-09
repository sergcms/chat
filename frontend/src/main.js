import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

new Vue({ 
        axios, 
        router, 
        store,
        Cookies, 
        render: h => h(App) 
    }).$mount('#app')

