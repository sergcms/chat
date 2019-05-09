<template>
  <div class="user-panel bg-info">
    <div v-if="token" class="col-md-12">
      <div class="user-info d-flex justify-content-between">
        <span class="user-name text-left text-white"><strong>{{ name }}</strong></span>
        <span class="logout" v-on:click="logout()">Logout</span>
      </div>
      <hr>
      <div class="d-flex justify-content-between">
        <span>Users: {{ users.length }}</span>
        <!-- <span v-show="activeUsers.length > 0">Select user(s): {{ activeUsers.length }}</span> -->
      </div>
      <hr>
      <div class="general d-flex justify-content-start">
        <span>General channel</span>
      </div>
      <hr>
      <div class="users-list d-flex" id="users">
        <span 
          v-for="(user) in users" :key="user.id" 
          v-on:click="selectUserForPrivateRoom(user.id)"
            >{{ user.name }}</span>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
  .user-panel {
    padding: 15px 0;
    min-height: 760px;
  }
  .users-list {
    flex-direction: column;
    align-items: flex-start;
  }
  .users-list span:hover {
    cursor: pointer;
    color: red;
  }
  .users-list .online {
    color: green;
  }
  .users-list .active {
    color: red;
  }
  .general {
    color: white;
  }
  .general:hover {
    color: red;
    cursor: pointer;
  }
  .logout {
    margin-left: 30px;
    cursor: pointer;
  }
  .logout:hover {
    color:silver;
  }
</style>

<script>
  import axios from "axios";
  import store from "../store";

  export default {
    name: 'user-panel',

    data: function () {
      return {
        user_id: 0,
        id: 0,
        activeUsers: [],
        isActive: false,
        url: store.getters.getUrl,
      }
    },

    mounted: function () {
      // get current user id
      this.user_id = store.getters.getUser.id;
    },

    computed: {
      
      token () {
        return store.getters.getToken;
      },

      name () {
        return store.getters.getUser.name;
      },

      users() {
        return store.getters.getUsers.filter(user => user.id !== this.user_id);
      },

    },

    methods: {
      selectUsersChat: function (id) {
        console.log(this.user_id + ' - ' + id);

        // find index of user id
        let index = this.activeUsers.indexOf(id);

        if (index !== -1) {
          this.activeUsers.splice(index, 1);
        } else {
          this.activeUsers.push(id);
        }
        // e.target.dataset['userId'];
      },

      selectUserForPrivateRoom: function (user_id) {
        axios.post(this.url + 'room', { users : [this.user_id, user_id], token: this.token })
          .then((response) => {
            store.dispatch('setToUserOfId', user_id);
          })
          .catch((error) => console.log(error));
      },

      logout: function () {
        return store.dispatch('logout');
      }
    },

  }
</script>


