<template>
  <div class="wrapper">
    <side-bar :background-color="backgroundColor">
      <sidebar-link to="/a">
        <i class="tim-icons icon-spaceship"></i>
        <template>
          <p class="sidebar-link-text">New & Hot</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/b">
        <i class="tim-icons icon-bell-55"></i>
        <template>
          <p class="sidebar-link-text">Ongoing</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/c">
        <i class="tim-icons icon-pin"></i>
        <template>
          <p class="sidebar-link-text">Upcoming</p>
        </template>
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
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Rock</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Blues</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Jazz</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Hip Hop Music</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Folk Music</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Classical Music</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p class="sidebar-link-text">Dashboard</p>
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


<style scoped="scss">
.sidebar-link-text {
  font-weight: bold;
}

</style>
