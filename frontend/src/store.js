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
    toUser: {},
    users: [],
  },

  getters: {
    hasUserId: state => (state.user.id !== undefined),
    getToUser: state => state.toUser,
    getUrl:    state => state.url,
    getUser:   state => state.user,
    getToken:  state => state.token,
    getUsers:  state => state.users,
  },

  mutations: {

    failLogin(state) {
      state.token = null;
      Cookies.remove('token');
    },

    // set token
    setToken(state, token) {
      state.token = token;

      let expireTime = new Date(new Date().getTime() + 10 * 60 * 60 * 1000); //10 hr
      
      Cookies.set('token', token, { expires: expireTime })
    },

    // set user
    setUser(state, { user }) {
      state.user = user;

      let index = state.users.findIndex(function (item) {
        return item.id == user.id; 
      });
      
      if (index == -1) {
        state.users.push(user);
      }
    },

    // set to user of id
    setToUser(state, id) {
      let index = state.users.findIndex(function (item) {
        return item.id == id; 
      });

      state.toUser = state.users[index];
    },

    // logout
    logout(state) {
      state.user = {};
      state.token = null;
      Cookies.remove('token');
    }
  },

  actions: {

    setToken ({ commit }, { token }) {
      commit('setToken', { token })
    },

    parseToken ({ commit }, { token }) {
      try {
        const { user } = JSON.parse(
          window.atob(
            token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
          )
        )
        commit('setUser', { user })
      } catch (e) {
        commit('logout')
        return false
      }
    },

    // user
    async fetchToken ({ commit }, { data }) {
      try {
        console.log('asas');

        const { token } = await axios.post('http://chat.test/api/auth/login', data).data
        commit('setToken', { token })
      } catch (e) {
        commit('failLogin')
      }
    },

    // set to user
    setToUserOfId ({ commit }, id) {
      commit('setToUser', id);
    },

    // logout
    logout ({commit}) {
      commit('logout');

      router.replace('/login');
    }
  }
})

