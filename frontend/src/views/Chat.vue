<template>
  <div class="chat mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4 text-left">
          <div class="d-flex justify-content-between">
            <span>Users: {{ users.length }}</span>
            <span v-show="activeUsers.length > 0">Select user(s): {{ activeUsers.length }}</span>
          </div>
          <div class="card">
            <div class="card-body">
              <div class="form-group row">
                <ul class="users-list" id="users">
                  <li 
                    v-for="(user) in users" :key="user.id" 
                    v-on:click="selectUsersChat(user.id)"
                  >{{ user.name }}</li>
                </ul>

              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <div class="form-group row">
                <label for="chat">Chat</label>
                <textarea class="form-control" name="chat" id="chat" rows="25">

                </textarea>
              </div>

              <div class="form-group row">
                <div class="col-md-10">
                  <input id="message" type="message" class="form-control" name="message" required>
                </div>
            
                <div class="col-md-2">
                  <button class="btn btn-primary">
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

<style>
  .users-list li:hover {
    cursor: pointer;
    /* font-weight: bold; */
    color: red;
  }
  .users-list .online {
    color: green;
  }
  .users-list .active {
    color: red;
  }
</style>

<script>
export default {
  name: 'chat',
  
  data: function () {
    return {
      message: "message",
      user_id: 0,
      id: 0,
      activeUsers: [],
      isActive: false,
    }
  },

  mounted: function () {
    // save info from token
    this.$store.dispatch('save', this.$store.getters.getToken);
    // get current user id
    this.user_id = this.$store.getters.getUser.id;

  },

  computed: {
    // user_id() {
    //   return this.$store.getters.getUser.id;
    // },

    users() {
      return this.$store.getters.getUsers.filter(user => user.id !== this.user_id);
    },

  },

  methods: {
    selectUsersChat: function (id) {

      // find index of user id
      let index = this.activeUsers.indexOf(id);

      if (index !== -1) {
        this.activeUsers.splice(index, 1);
      } else {
        this.activeUsers.push(id);
      }
      
      // e.target.dataset['userId'];
      console.log(this.activeUsers);

    },

    sendMessage: function() {


    },
  }
}
</script>
