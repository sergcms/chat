<template>
  <div class="register">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <!-- <form method="POST" action="http://chat.test/api/register"> -->
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" name="name" value="" required autocomplete="name" autofocus v-model="name">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" value="" required autocomplete="email" autofocus v-model="email">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" required v-model="password">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm password</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required v-model="password_confirmation">
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-6">
                                    <button type="button" class="btn btn-primary" @click="register()">
                                        Register
                                    </button>

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

import axios from 'axios';
// import router from '../router';

export default {
    name: 'register',

    data: function () {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
    },

    mounted() {
       
    },

    components: {
        
    },

    methods: {
        register: async function () {
            // get value from inputs
            var auth = {
                name: this.name,
                email: this.email, 
                password: this.password,
                password_confirmation: this.password_confirmation,
            }

            try {
                const response = await axios.post('http://chat.test/api/auth/register', auth);
                this.$store.dispatch('setToken', { token: response.data.token });
            } catch (e) {
                this.$store.dispatch('failLogin');
            }

            this.$router.push('/chat');
        },
    }
}
</script>
