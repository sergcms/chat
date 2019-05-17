import axios from 'axios';

export default({
  namespaced: true,

  state: {
    messages: [],
  },

  getters: {
    getMessages: state => state.messages,
  },

  mutations: {
    pushMessage(state, { message }) {
      // let messages = state.messages;

      // state.messages = messages.push('tetst');
    },

    setMessages(state, { data }) {
      state.messages = data;
    },
  },

  actions: {
    pushMessage({ commit } , { message }) {
      commit('pushMessage', { message });
    },

    async getMessages({ commit }, { token }) {
      try {
        let { data } = await axios.post('http://chat.test/api/messages', { token : token });
        commit('setMessages', { data })
      } catch (e) {
        console.log(e.message);
      }
    }
  },

});