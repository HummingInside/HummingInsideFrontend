<template>
  <div class="wrapper">
    <!-- <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}"> -->

    <side-bar :background-color="backgroundColor">
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/a">
        <i class="tim-icons icon-spaceship"></i>
        <template>
          <p>New & Hot</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/b">
        <i class="tim-icons icon-bell-55"></i>
        <template>
          <p>Ongoing</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/c">
        <i class="tim-icons icon-pin"></i>
        <template>
          <p>Upcoming</p>
        </template>
      </sidebar-link>
      <hr style="border-color: rgba(255, 255, 255, .45);"/>
      <sidebar-link to="/d">
        <i class="tim-icons icon-app"></i>
        <template>
          <p>My Concerts</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/e">
        <i class="tim-icons icon-bag-16"></i>
        <template>
          <p>My Tickets</p>
        </template>
      </sidebar-link>
      <hr style="border-color: rgba(255, 255, 255, .45);"/>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Rock</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Blues</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Jazz</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Hip Hop Music</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Folk Music</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Classical Music</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-headphones"></i>
        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/icons">
        <i class="tim-icons icon-atom"></i>
        <template>
          <p>Icons</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/maps">
        <i class="tim-icons icon-pin"></i>
        <template>
          <p>Maps</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <i class="tim-icons icon-bell-55"></i>
        <template>
          <p>Notifications</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/user">
        <i class="tim-icons icon-single-02"></i>
        <template>
          <p>User Profile</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/table">
        <i class="tim-icons icon-puzzle-10"></i>
        <template>
          <p>Table List</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/typography">
        <i class="tim-icons icon-align-center"></i>
        <template>
          <p>Typography</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard?enableRTL=true">
        <i class="tim-icons icon-world"></i>
        <template>
          <p>RTL Support</p>
        </template>
      </sidebar-link>
    </side-bar>
    <sidebar-share :background-color.sync="backgroundColor"></sidebar-share>

    <div class="main-panel" :data="backgroundColor">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
import SidebarShare from "./SidebarSharePlugin.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    SideBar,
    SidebarLink,
    SidebarShare
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
