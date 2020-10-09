<template>
  <div class="content">
    <div class="row">
      <div class="col-md-4">
        <sign-in-card :model="model">
        </sign-in-card>
      </div>
    </div>
  </div>
</template>
<script>
import SignInCard from "@/pages/Profile/SignInCard";

export default{
  components:{
    SignInCard
  },
  data() {
    return {
    }
  }
}
</script>
<style></style>
