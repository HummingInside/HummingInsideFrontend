<template>
  <div class="wrapper">
    <div class="auth-layout">
      <div class="main-panel" :data="backgroundColor">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
/*.main-panel .content{
  padding: inherit;
  margin-top: 270px;
}*/
.auth-layout .main-panel{
  background: #0098f0;
  background: -webkit-linear-gradient(0deg, #0098f0 0%, #00f2c3 100%);
  background: -o-linear-gradient(0deg, #0098f0 0%, #00f2c3 100%);
  background: -moz-linear-gradient(0deg, #0098f0 0%, #00f2c3 100%);
  background: linear-gradient(0deg, #0098f0 0%, #00f2c3 100%);
}

.auth-layout .main-panel .content{
  padding: initial;
  margin: 270px;
}

.auth-layout .main-panel .content .col-md-4{
  margin: 0 auto;
}

.auth-layout .main-panel .content .col-md-6{
  margin: 0 auto;
}
</style>
<script>

export default {
  components: {
  },
  data() {
    return {
      backgroundColor: "green"
    };
  },
  computed: {
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>