<template>
  <card>
    <template slot="header">
      <h5 class="title">
        <img class="avatar" src="../../assets/img/bird-icon.png" alt="..." style="border: initial; border-radius: initial; float: left">
        Sign up to HummingInside</h5>
    </template>
    <div class="row">
      <div class="col-md-12 text-left">
        <base-input label="Name"
                    type="text"
                    v-model="name"
                    placeholder="Name">
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-left">
        <base-input label="Email"
                    type="email"
                    v-model="email"
                    placeholder="mike@email.com">
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-left">
        <base-input label="Password"
                    type="password"
                    v-model="password"
                    placeholder="Password">
        </base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-left">
        <base-input label="Password Check"
                    type="password"
                    v-model="check"
                    placeholder="Password Check">
        </base-input>
      </div>
    </div>

    <template slot="footer">
      <div style="text-align: center">
        <base-button type="success" fill v-on:click="onSubmit">Confirm</base-button>
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
import {REGISTER} from "@/store/actions.type";
import {mapState} from "vuex";

export default{
  components:{
    Card,
    BaseInput,
    BaseButton
  },
  methods: {
    onSubmit:function() {
      if(this.password === this.check){
        this.$store
            .dispatch(REGISTER, { name: this.name, email: this.email, password: this.password })
            .then(() => this.$router.push({ name: "sign-in" }));
      }else{
        alert("입력된 비밀번호가 서로 다릅니다.");
      }
    }
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      check: null
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
}
</script>
<style>
.card{
  padding: 40px 30px 30px 30px;
  border-radius: 3%;
}
</style>
