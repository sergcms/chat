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
                <label for="chat">name</label>
                <textarea class="form-control" name="chat" id="chat" rows="25" readonly v-model="messagesHistory.join('\n')"></textarea>
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
import UserPanel from "../components/UserPanel.vue";

Vue.component('user-panel', UserPanel);

export default {
  name: 'chat',
  
  data: function () {
    return {
      message: '',
      messagesHistory: [],
    }
  },

  componets: {
    //  UserPanel,
  },

  mounted: function () {
  },

  computed: {
    // user_id() {
    //   return this.$store.getters.getUser.id;
    // },

  },

  methods: {
    sendMessage: function() {

      this.messagesHistory.push(this.message); 

      this.message = '';
    },
  }
}
</script>
