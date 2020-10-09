<template>
  <card class="test" type="user">
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="#">
        <img class="avatar" src="../../assets/img/anime6.png" alt="...">
        <h5 class="title">Sign in to HummingInside</h5>
      </a>
    </div>
    <div class="row">
      <div class="col-md-12 text-left">
        <base-input label="Email address"
                    type="email"
                    placeholder="mike@email.com">
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-left">
        <base-input label="Password"
                    placeholder="Password">
        </base-input>
      </div>
    </div>

    <template slot="footer">
      <base-button type="success" fill>Sign In</base-button>
      <base-button type="success" fill>Sign Up</base-button>
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
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
}
</script>
<style>
.title{
  font-size: 25px;
}
</style>
