<template>
  <div class="chat mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <span>Users</span>

          <div class="card">
            <div class="card-body">
              <div class="form-group row">
                <ul class="users-list" id="users">
                  <li v-for="user in users" :key="user.id" v-bind:user-id="user.id" >{{ user.name }}</li>
                </ul>
                <!-- <textarea class="form-control" name="users" id="users" rows="25">{{ users }}</textarea> -->
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

<script>
export default {
  name: 'chat',
  
  data: function () {
    return {
      message: "message",
    }
  },

  mounted: function () {
    this.message = "sasadfasdf";


  },

  computed: {
    users() {
      return this.$store.getters.getUsers
    }
  },

  methods: {

  }
}
</script>
