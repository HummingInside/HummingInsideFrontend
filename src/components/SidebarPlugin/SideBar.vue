<template>
  <div
      class="sidebar"
      :data="backgroundColor">
      <div class="sidebar-wrapper text-left">
        <div class="logo">
          <router-link to="/" class="simple-text logo-mini">
            {{ abv }}
          </router-link>

          <router-link to="/" class="simple-text logo-normal">
            {{ title }}
          </router-link>
        </div>
        <ul class="nav">
          <slot>
            <sidebar-link>
            </sidebar-link>
          </slot>
        </ul>
      </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";

export default{
  name: "side-bar",
  components: {
    SidebarLink
  },
  props: {
    abv: {
      type: String,
      default: "HI"
    },
    title: {
      type: String,
      default: "Humming Inside"
    },
    backgroundColor: {
      type: String,
      default: "green"
    },
    sidebarLinks:{
      type: Array,
      default: () => []
    }
  },
  data(){
    return{
      activeLinkIndex: 0
    }
  },
  computed:{
  },
  methods:{
    findActiveLink(){
      this.links.forEach((link, index) => {
        if(link.isActive()){
          this.activeLinkIndex = index;
        }
      });
    }
  }
}
</script>
<style>
</style>
