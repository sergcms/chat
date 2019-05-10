import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import Cookies from 'js-cookie'
import VueSwal from 'vue-swal'

Vue.use(Vuex)
Vue.use(VueSwal)

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
      
      Cookies.set('token', token, { expires: expireTime });
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
    // set token
    setToken ({ commit }, { token }) {
      commit('setToken', token); // { token }
    },

    // parse token 
    parseToken ({ commit }, { token }) {
      try {
        const { user } = JSON.parse(
          window.atob(
            token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
          )
        );

        commit('setUser', { user });
      } catch (e) {
        commit('logout');
      }
    },

    // set to user
    setToUserOfId ({ commit }, id) {
      commit('setToUser', id);
    },

    // fail login
    failLogin ({ commit }) {
      commit('failLogin');
    },

    // logout
    logout ({commit}) {
      commit('logout');

      router.replace('/login');
    },
  }
})

