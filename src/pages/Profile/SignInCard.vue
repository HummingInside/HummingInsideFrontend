<template>
  <card class="auth-card" type="user">
    <div class="author">
      <a href="#">
        <img class="avatar" src="../../assets/img/bird-icon.png" alt="...">
        <h5 class="title">Sign in to HummingInside</h5>
      </a>
    </div>
    <div class="row">
      <div class="col-md-10 text-left" style="margin-left: 35px">
        <base-input label="Email address"
                    type="email"
                    placeholder="mike@email.com"
                    v-model="email">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 text-left" style="margin-left: 35px">
        <base-input label="Password"
                    type="password"
                    v-model="password"
                    placeholder="Password" v-on:keyup.enter="onSubmit">
        </base-input>
      </div>
    </div>

    <template slot="footer">
      <div class="signin-button">
        <base-button type="success" fill v-on:click="onSubmit">Sign In</base-button>
      </div>
      <div class="signup-link">
        <router-link to="/sign-up" class="text-light"><small>Create new account</small></router-link>
      </div>
    </template>
  </card>
</template>
<script>
import {
  Card,
  BaseInput
} from "@/components/index";

import BaseButton from '@/components/BaseButton';
import { mapState } from "vuex";
import { LOGIN } from "@/store/actions.type";

export default {
  name:'SignInCard',
  components: {
    Card,
    BaseButton,
    BaseInput
  },
  methods: {
    onSubmit:function() {
      this.$store
          .dispatch(LOGIN, { email: this.email, password: this.password })
          .then(() => this.$router.push({ name: "concert-list" }));
    }
  },
  data() {
    return {
      email: null,
      password: null
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
<style>
.title{
  font-size: 25px;
}
.auth-card .author .avatar{
  border: initial;
  border-radius: initial;
}

.signin-button{
  text-align: center;
}

.signup-link{
  text-align: center;
  color: #adb5bd !important;
}
</style>
