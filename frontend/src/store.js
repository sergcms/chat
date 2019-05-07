import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.token,
    user: {},
    users: [],
  },

  getters: {
      getUser: state  => state.user,
      getToken: state => state.token,
      getUsers: state => state.users,
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
      // let expireTime = new Date(new Date().getTime() + 10 * 60 * 60 * 1000);
    },

    setUser(state, user) {
      state.user = user;

      let index = state.users.findIndex(function (item) {
        return item.id == user.id; 
      });
      
      if (index == -1) {
        state.users.push(user);
      }
    },

    logout(state) {
      state.user = {};
      state.token = null;
      localStorage.removeItem('token');
    }
  },

  actions: {
    save ({ commit }, data) {
      // axios.post(window.location.hostname + data.route,  data.auth)

      axios.post('http://chat.test' + data.route,  data.auth)
        .then((response) => {

          try {
            var data = JSON.parse(
              window.atob(
                response.data.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
              )
            );
          } 
          catch (e) {
            commit('logout');
          }

          if (response.data.token !== 'undefined') {
            commit('setToken', response.data.token);
            commit('setUser', data.user);
            
            router.replace('/chat');

          }
        })
        .catch(error => error);

    },

    logout ({commit}) {
      commit('logout');

      router.replace('/login');
    }
  }
})
