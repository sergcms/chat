<template>
  <div class="chat mt-5">
    <div class="container-fluit">
      <div class="row">
        <div class="col-md-3">
          <user-panel/>
        </div>

        <div class="col-md-9 ml-m3">
          <div class="card">
            <div class="card-body">
              <div class="form-group row">
                <label for="chat">{{ toUser.name }}</label>
                <textarea class="form-control" name="chat" id="chat" rows="25" readonly v-bind:value="messagesHistory.join('\n')"></textarea>
              </div>

              <div class="form-group row">
                <div class="col-md-10">
                  <input id="message" type="message" class="form-control" name="message" v-model="message" required v-on:keyup.enter="sendMessage()">
                </div>
            
                <div class="col-md-2">
                  <button class="btn btn-primary" v-on:click="sendMessage()">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .ml-m3 {
    margin-left: -30px;
  }
</style>


<script>
import Vue from "vue";
import axios from "axios"
import UserPanel from "../components/UserPanel.vue";
import { mapGetters } from 'vuex';

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
    // this.getMessages();

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
    '$route.params.room_id' : function() {
      this.getMessages();
    },

  },

  methods: {
    sendMessage: async function() {

      let data = {
        user: this.currentUser.id,
        room: this.room_id,
        message: this.message,
      }

      if (this.message != '') { 
        try {
          // const { data } = await axios.post('http://chat.test/api/message', { data, token: this.token });
          let response = await axios.post('http://chat.test/api/message', { data, token: this.token });
          
          this.messagesHistory.push(response.data); 
        } catch (e) {
          this.$swal('Oops!', 'Your message is not delivered!', 'error');
        }
      } else {
        return this.$swal('Oops!', 'Write message!', 'error');
      }

      this.message = '';
    },

    getMessages: async function() {
      try {
        var self = this;

        var response = await axios.post('http://chat.test/api/messages',  
          { room: this.room_id, token: this.token });
        
        
      } catch (e) {
        this.$swal('Oops!', 'History messages not found!', 'error');
      }
     

       response.data.forEach(function (item, key) {
            var id = item.user_id;
            if (self.currentUser.id == id) {
              self.messagesHistory.push('You: \n' + item.message);
            } else {
              let user = self.users.filter(user => user.id == id);
              self.messagesHistory.push(user[0].name + ': \n' + item.message);
            }
          });



    },

  }
}
</script>
