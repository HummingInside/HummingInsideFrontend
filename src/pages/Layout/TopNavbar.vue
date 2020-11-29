<template>
  <nav class="navbar navbar-expand-lg navbar-absolute"
       :class="{'bg-white': showMenu, 'navbar-transparent': !showMenu}">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline" :class="{toggled: $sidebar.showSidebar}">
          <button type="button"
                  class="navbar-toggler"
                  @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="javascript:void(0)"> {{ $route.name }}</a>
      </div>
      <button class="navbar-toggler" type="button"
              @click="toggleMenu"
              data-toggle="collapse"
              data-target="#navigation"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>
      <div class="collapse navbar-collapse show text-left" v-show="showMenu">
        <ul class="navbar-nav ml-auto">
          <li class="search-bar input-group">
            <router-link :to="{name: 'concert-create'}" exact>
              <button class="btn btn-link" id="broadcast-button"><i class="tim-icons icon-video-66"></i>
                Broadcast
                <!-- <span class="d-lg-none d-md-block">Broadcast</span> -->
              </button>
            </router-link>
          </li>
          <li class="search-bar input-group">
            <button @click="myPage" class="btn btn-link" id="myPage-button"><i class="tim-icons icon-satisfied"></i>
              MYPAGE
              <!-- <span class="d-lg-none d-md-block">MYPAGE</span> -->
            </button>
          </li>
          <drop-down>
                <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                  <div class="photo">
                    <img src="@/assets/img/anime3.png" alt="Profile Photo">
                  </div>
                  <b class="caret d-none d-lg-block d-xl-block"></b>
                  <p class="d-lg-none">
                    Log out
                  </p>
                </a>
                <ul class="dropdown-menu dropdown-navbar">
                  <!-- <li class="nav-link"><a @click="myPage" class="nav-item dropdown-item">MY page</a></li>
                  <li class="dropdown-divider"></li> -->
                  <li class="nav-link"><a @click="logout" class="nav-item dropdown-item">Log out</a></li>
                </ul>
              </drop-down>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>

import DropDown from "@/components/Dropdown.vue";
import {LOGOUT} from "@/store/actions.type";

  export default{
    components:{
      DropDown,
    },
    data() {
      return {
        searchModalVisible: false,
        searchQuery: '',
        showMenu: false
      };
    },
    methods:{
      toggleSidebar(){
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      toggleMenu(){
        this.showMenu  = !this.showMenu;
      },
      logout:function() {
        this.$store
            .dispatch(LOGOUT)
            .then(() => this.$router.push({ name: "sign-in" }));
      },
      myPage:function (){
        this.$router.push({ name: "my-page" })
      }
    },
    computed:{
    }
  }
</script>

<style>
.search-bar{
  margin-left: 0;
}
</style>
