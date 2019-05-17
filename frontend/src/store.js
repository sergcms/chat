import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import Cookies from 'js-cookie'
import VueSwal from 'vue-swal'
import Echo from 'laravel-echo';

import general from './store/module/general';
// window.io = require('socket.io-client');

Vue.use(Vuex)
Vue.use(VueSwal)

export default new Vuex.Store({
  modules: {
    general,
  },

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
      // let expireTime = new Date(new Date().getTime() + 10 * 60 * 60 * 1000); //10 hr
      // Cookies.set('token', token, { expires: expireTime });
      Cookies.set('token', token);
    },

    // set current user
    setCurrentUser(state, { user }) {
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
      let index = state.users.findIndex((user) => user.id == id);
      state.toUser = state.users[index];
    },

    // set all users,
    setAllUsers(state, users) {
      state.users = users;
    },

    // logout
    logout(state) {
      state.user = {};
      state.token = null;
      Cookies.remove('token');
    },

    // Echo authorization 
    EchoAuth(state) {
      // // Have this in case you stop running your laravel echo server
      // if (typeof io !== 'undefined') {
        window.Echo = new Echo({
          broadcaster: 'socket.io',
          // host: window.location.hostname + :'6001',
          host: 'http://chat.test' + ':6001',
          auth: {
            headers: {
              Authorization: 'Bearer ' + state.token,
            },
          },
        });

        // return window.Echo.private(channel);
      // }
    },
  },

  actions: {
    // set token
    setToken({ commit }, { token }) {
      commit('setToken', token);
    },

    // parse token 
    parseToken({ commit }, { token }) {
      try {
        const { user } = JSON.parse(
          window.atob(
            token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
          )
        );

        commit('setCurrentUser', { user });
      } catch (e) {
        commit('logout');
      }
    },

    // set to user
    setToUserOfId({ commit }, id) {
      commit('setToUser', id);
    },

    // set users
    setAllUsers({ commit }, users) {
      commit('setAllUsers', users);
    },

    // fail login
    failLogin({ commit }) {
      commit('failLogin');
    },

    // logout
    logout({commit}) {
      commit('logout');

      router.replace('/login');
    },

    // Echo authorization 
    EchoAuth({commit}) {
      commit('EchoAuth');
    },
  }
})

