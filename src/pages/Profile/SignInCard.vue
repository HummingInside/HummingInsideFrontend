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
                    placeholder="Password">
        </base-input>
      </div>
    </div>

    <template slot="footer">
      <div class="signin-button">
        <base-button type="success" fill>Sign In</base-button>
        <!--<base-button v-on:click="link">Sign Up</base-button>-->
      </div>
      <div class="signup-link">
        <router-link to="/sign-up" class="text-light"><small>Create new account</small></router-link> /
        <router-link to="/sign-up" class="text-light"><small>Forget your password?</small></router-link>
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

export default {
  components: {
    Card,
    BaseButton,
    BaseInput
  },
  data: function (){
    return {
      email: '',
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods:{
    link: function (){
      this.$router.push('/sign-up')
    }
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
