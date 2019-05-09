import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: Cookies.get('token'),
    url: 'http://chat.test/api/',
    user: {},
    users: [],
  },

  getters: {
    getUrl:   state => state.url,
    getUser:  state => state.user,
    getToken: state => state.token,
    getUsers: state => state.users,
  },

  mutations: {

    // set token
    setToken(state, token) {
      state.token = token;

      let expireTime = new Date(new Date().getTime() + 10 * 60 * 60 * 1000); //10 hr
      
      Cookies.set('token', token, { expires: expireTime })
    },

    // set user
    setUser(state, user) {
      state.user = user;

      let index = state.users.findIndex(function (item) {
        return item.id == user.id; 
      });
      
      if (index == -1) {
        state.users.push(user);
      }
    },

    // logout
    logout(state) {
      state.user = {};
      state.token = null;
      Cookies.remove('token');
    }
  },

  actions: {

    // save
    save ({ commit }, token) {
      try {
        var data = JSON.parse(
          window.atob(
            token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
          )
        );
      } 
      catch (e) {
        commit('logout');
      }

      if (token !== 'undefined') {
        commit('setToken', token);
        commit('setUser', data.user);
        
        router.replace('/chat');
      }

    },

    // user
    fetchUser ({ dispatch }, data) {
      // axios.post(window.location.hostname + data.route,  data.auth)
      axios.post('http://chat.test' + data.route, data.auth)
        .then((response) => {
          dispatch('save', response.data.token);
        })
        .catch(error => error);
    },

    // logout
    logout ({commit}) {
      commit('logout');

      router.replace('/login');
    }
  }
})
