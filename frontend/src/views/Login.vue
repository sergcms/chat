<template>
  <div class="login">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <!-- <form method="POST" action="http://chat.test/api/auth/login"> -->
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" value="" required autocomplete="email" autofocus v-model="email">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" required autocomplete="current-password" v-model="password">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-6 offset-md-5">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" v-model="remember">
                                        <label class="form-check-label" for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-6">
                                    <button type="button" class="btn btn-primary" v-on:click="login()">
                                        Login
                                    </button>

                                    <!-- <a class="btn btn-link" href="">
                                        Forgot Your Password?
                                    </a> -->
                                </div>
                            </div>
                        <!-- </form> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import axios from 'axios';
// import router from '../router';

export default {
  name: 'login',

  mounted() {
       
  },

    data: function () {
        return {
            email: '',
            password: '',
            remember: false,
        }
    },

    components: {

    },

    methods: {
        login: function login() {
            // e.preventDefault();

            // get value from inputs
            var data = {
                route: '/api/auth/login',
                auth : {
                    email: this.email,
                    password: this.password,
                    remember: this.remember
                }
            }

            this.$store.dispatch('fetchUser', data);
        },

    }
}
</script>
