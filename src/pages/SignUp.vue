<template>
  <div class="content">
    <div class="row">
      <div class="col-md-6">
        <!--<edit-profile-form :model="model">
        </edit-profile-form>-->
        <sign-up-card :model="model"></sign-up-card>
      </div>
    </div>
  </div>
</template>
<script>
import SignUpCard from "@/pages/Profile/SignUpCard";

export default{
  components:{
    SignUpCard
  },
  data() {
    return {
      model: {
        company: 'Creative Code Inc.',
        email: 'mike@email.com',
        username: 'michael23',
        firstName: 'Mike',
        lastName: 'Andrew',
        address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
        city: 'Melbourne',
        country: 'Australia',
        about: 'Lamborghini Mercy, Your chick she so thirsty, I\'m in that two seat Lambo.'
      }
    }
  }
}
</script>
<style>
</style>
