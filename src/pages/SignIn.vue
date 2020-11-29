<template>
  <div class="content">
    <div class="row">
      <div class="col-md-5">
        <sign-in-card :model="model">
        </sign-in-card>
      </div>
    </div>
  </div>
</template>
<script>
import SignInCard from "@/pages/Profile/SignInCard";

export default{
  name: 'SignIn',
  components:{
    SignInCard
  },
  methods: {
  },
  data() {
    return {
      model:{

      }
    };
  }
};
</script>
<style></style>
