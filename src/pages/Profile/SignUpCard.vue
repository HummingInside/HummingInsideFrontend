<template>
  <card class="test">
    <template slot="header">
      <h5 class="title">Sign up to HummingInside</h5>
    </template>
    <div class="row">
      <div class="col-md-12 text-left">
        <base-input label="Username"
                    placeholder="Username">
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-left">
        <base-input label="Email"
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

    <div class="row">
      <div class="col-md-12 text-left">
        <base-input label="Password Check"
                    placeholder="Password Check">
        </base-input>
      </div>
    </div>

    <template slot="footer">
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

export default{
  components:{
    Card,
    BaseInput,
    BaseButton
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }

}
</script>
<style>
</style>
