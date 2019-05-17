<template>
  <chat-panel v-bind:to-user="toUser" v-on:sendMessage="sendMessage" v-bind:messagesHistory="messagesHistory"></chat-panel>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import UserPanel from "../components/UserPanel.vue";
import ChatPanel from "../components/ChatPanel.vue";
import { mapGetters } from 'vuex';
import Echo from 'laravel-echo';
// import router from '../router';

Vue.component('user-panel', UserPanel);
Vue.component('chat-panel', ChatPanel);

export default {
  name: 'chat',

  data: function() {
    return {
      message: '',
      messagesHistory: [],
    }
  },

  created: function() {
    this.loadGeneralChannel();
  },

  mounted() {
    // this.$store.dispatch('general/pushMessage', { message: 'test10', });
    // this.$store.dispatch('general/getMessages', { token: this.token });
  },

  computed: {
    ...mapGetters({
      token: 'getToken',
      currentUser: 'getUser',
      toUser: 'getToUser',
      users: 'getUsers',
      messages: 'general/getMessages'
    }),

  },

  methods: {
    // load room with listen event
    loadGeneralChannel: async function() {
      await this.$store.dispatch('EchoAuth');
        // .listen('MessagePushed', ({ message }) => {
        //   this.messagesHistory.push(message.message);
        // });

      // ?? 
      window.Echo.private('chat')
        .listen('MessagePushed', ({ message }) => {
          this.messagesHistory.push(message.message);
        });

      this.getMessages();

    },

    // send message
    sendMessage: async function() {
      console.log('yes');
      // let data = {
      //   user: this.currentUser.id,
      //   message: this.message,
      // }

      // if (this.message != '') { 
      //   try {
      //     let response = await axios.post('http://chat.test/api/message', { data, token: this.token });
      //     // this.messagesHistory.push(response.data); 
      //   } catch (e) {
      //     this.$swal('Oops!', 'Your message is not delivered!', 'error');
      //   }
      // } else {
      //   return this.$swal('Oops!', 'Write message!', 'error');
      // }

      // this.message = '';
    },

    // get history messages of general channel
    getMessages: async function() {
      await this.$store.dispatch('general/getMessages', { token: this.token });

      var self = this;
      this.messages.forEach(function (item) {
        self.messagesHistory.push(item.message);
      });
    },

  }
}
</script>
