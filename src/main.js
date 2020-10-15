import Vue from "vue";
import VueRouter from "vue-router";
import SocialSharing from "vue-social-sharing"
import VueGitHubButtons from "vue-github-buttons"
import "vue-github-buttons/dist/vue-github-buttons.css"
import App from "./App.vue";
import '@/assets/scss/white-dashboard.scss';
import '@/assets/css/nucleo-icons.css';
import "@/assets/demo/demo.css";


import routes from "./router";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notify from "@/components/NotificationPlugin";
import SideBar from "@/components/SidebarPlugin";
import ApiService from "./common/api.service";

const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "active"
});

ApiService.init();
Vue.config.productionTip = false

// router setup
Vue.use(VueRouter);
Vue.use(SocialSharing);
Vue.use(VueGitHubButtons, { useCache: true });
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(SideBar);
Vue.use(Notify);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
