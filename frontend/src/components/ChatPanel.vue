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
                <label for="chat">{{ toUser.name != undefined ? toUser.name : 'General chat' }}</label>
                <textarea class="form-control" name="chat" id="chat" rows="25" readonly v-bind:value="messagesHistory.join('\n')"></textarea>
              </div>

              <div class="form-group row">
                <div class="col-md-10">
                  <input id="message" type="message" class="form-control" name="message" v-model="message" placeholder="Message..." required v-on:keyup.enter="sendMessage()">
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
  // import axios from "axios";
  // import store from "../store";
  import { mapGetters } from 'vuex';

  export default {
    name: 'chat-panel',

    props: [
      'toUser',
      'messagesHistory',
      // 'message',
    ],

    data: function () {
      return {
        message: '',
        user_id: 0,
        activeUsers: [],
        isActive: false,
      }
    },

    created: function () {

    },

    mounted() {

    },

    computed: {
      ...mapGetters({
        token: 'getToken',
        currentUser: 'getUser',
        users: 'getUsers',
      }),

    },

    methods: {
      sendMessage() {
        this.$emit('sendMessage', this.message);
        this.message = '';
      },
    }
  }
</script>


