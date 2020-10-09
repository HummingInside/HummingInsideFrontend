<template>
  <div class="wrapper">
    <div class="main-panel" :data="backgroundColor">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss">
.main-panel{
  background: #0098f0;
  background: -webkit-linear-gradient(0deg, #0098f0 0%, #00f2c3 100%);
  background: -o-linear-gradient(0deg, #0098f0 0%, #00f2c3 100%);
  background: -moz-linear-gradient(0deg, #0098f0 0%, #00f2c3 100%);
  background: linear-gradient(0deg, #0098f0 0%, #00f2c3 100%);
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