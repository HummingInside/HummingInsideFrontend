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
.auth-layout .main-panel .content{
  padding: initial;
  margin: 190px;
}

.auth-layout .main-panel .content .col-md-5{
  margin: 0 auto;
  min-width: 524px;
}

.auth-layout .main-panel .content .col-md-6{
  margin: 0 auto;
  min-width: 635px;
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