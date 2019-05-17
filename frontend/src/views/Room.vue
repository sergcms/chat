<template>
  <chat-panel v-bind:to-user="toUser" v-bind:message="message" v-bind:messagesHistory="messagesHistory"></chat-panel>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import UserPanel from "../components/UserPanel.vue";
import { mapGetters } from 'vuex';
import Echo from 'laravel-echo';
// import router from '../router';

Vue.component('user-panel', UserPanel);

export default {
  name: 'chat',
  
  props: ['room_id'],

  data: function() {
    return {
      message: '',
      messagesHistory: [],
    }
  },

  created: function() {

  },

  mounted() {

  },

  computed: {
    ...mapGetters({
      token: 'getToken',
      currentUser: 'getUser',
      toUser: 'getToUser',
      users: 'getUsers',
    }),

  },

  watch: {
    '$route.params.room_id' : function(room) {
      if (room == undefined) {
        router.push('/chat');
      } 

      this.loadRoom()
    },

  },

  methods: {
    // load room with listen event
    loadRoom: async function() {
      await this.$store.dispatch('EchoAuth');

      window.Echo.private('room.' + this.room_id)
        .listen('MessagePushed', ({ message }) => {
          this.messagesHistory.push(message.message);
        });

      this.getMessages();
    },

    // send message
    sendMessage: async function() {

      let data = {
        user: this.currentUser.id,
        room: this.room_id,
        message: this.message,
      }

      if (this.message != '') { 
        try {
          let response = await axios.post('http://chat.test/api/message', { data, token: this.token });
          
          // this.messagesHistory.push(response.data); 
        } catch (e) {
          this.$swal('Oops!', 'Your message is not delivered!', 'error');
        }
      } else {
        return this.$swal('Oops!', 'Write message!', 'error');
      }

      this.message = '';
    },

    // get history messages of room
    getMessages: async function() {
      try {
        var self = this;

        var response = await axios.post('http://chat.test/api/messages',  
          { room: this.room_id, token: this.token });
      } catch (e) {
        this.$swal('Oops!', 'History messages not found!', 'error');
      }

      self.messagesHistory = [];

      response.data.forEach(function (item) {
        var id = item.user_id;
        // if (self.currentUser.id == id) {
        //   self.messagesHistory.push('You: \n' + item.message);
        // } else {
        //   let user = self.users.filter(user => user.id == id);
        //   self.messagesHistory.push(user[0].name + ': \n' + item.message);
        // }

        self.messagesHistory.push(item.message);
      });

    },

  }
}
</script>
