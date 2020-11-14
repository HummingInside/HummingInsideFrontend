<template>
  <div class="wrapper">
    <side-bar :background-color="backgroundColor">
      <sidebar-link
          v-for="(status, index) in concertStatus" :key="index"
          :to="'/concerts?concertStatus=' + status.query">
        <i class="tim-icons" v-bind:class="status.icon"></i>
        <p class="sidebar-link-text">{{ status.text }}</p>
      </sidebar-link>
      <hr style="border-color: rgba(255, 255, 255, .45);"/>
      <sidebar-link to="/d">
        <i class="tim-icons icon-app"></i>
        <template>
          <p class="sidebar-link-text">My Concerts</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/e">
        <i class="tim-icons icon-bag-16"></i>
        <template>
          <p class="sidebar-link-text">My Tickets</p>
        </template>
      </sidebar-link>

      <hr style="border-color: rgba(255, 255, 255, .45);"/>

      <sidebar-link
          v-for="(category, index) in categories" :key="'a'+index"
          :to="'/concerts?categoryId=' + category.id">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">{{ category.name }}</p>
        </template>
      </sidebar-link>

      <sidebar-link to="/icons">
        <i class="tim-icons icon-atom"></i>
        <template>
          <p class="sidebar-link-text">Icons</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/maps">
        <i class="tim-icons icon-pin"></i>
        <template>
          <p class="sidebar-link-text">Maps</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <i class="tim-icons icon-bell-55"></i>
        <template>
          <p class="sidebar-link-text">Notifications</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/user">
        <i class="tim-icons icon-single-02"></i>
        <template>
          <p class="sidebar-link-text">User Profile</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/table">
        <i class="tim-icons icon-puzzle-10"></i>
        <template>
          <p class="sidebar-link-text">Table List</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/typography">
        <i class="tim-icons icon-align-center"></i>
        <template>
          <p class="sidebar-link-text">Typography</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard?enableRTL=true">
        <i class="tim-icons icon-world"></i>
        <template>
          <p class="sidebar-link-text">RTL Support</p>
        </template>
      </sidebar-link>
    </side-bar>

    <div class="main-panel" :data="backgroundColor">
      <top-navbar></top-navbar>
      <transition @click.native="toggleSidebar" name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <content-footer></content-footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_CATEGORIES } from "@/store/actions.type";
import store from "@/store";
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    SideBar,
    SidebarLink,
  },
  data() {
    return {
      backgroundColor: "green",
      concertStatus: [
        {query: 'ONAIR', text: 'ON-AIR', icon: 'icon-spaceship'},
        {query: 'UPCOMING', text: 'UPCOMING', icon: 'icon-bell-55'},
        {query: 'ENDED', text: 'ENDED', icon: 'icon-pin'}
      ],
    }
  },
  computed: {
    ...mapGetters(['categories'])
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    loadCategories(){
      store.dispatch(FETCH_CATEGORIES)
    }
  },
  mounted() {
    this.loadCategories()
  }
};
</script>


<style scoped="scss">
.sidebar-link-text {
  font-weight: bold;
}

</style>
