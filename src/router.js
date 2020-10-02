import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";


const routes = [{
  path: "/",
  component: DashboardLayout,
  redirect: "dashboard",
  children:[
    {
      path: "dashboard",
      name: "New & Hot",
      component: Dashboard
    },
    {
      path: "a",
      name: "New & Hot",
      component: Dashboard
    },
    {
      path: "b",
      name: "Ongoing",
      component: Dashboard
    },
    {
      path: "c",
      name: "Upcoming",
      component: Dashboard
    },
    {
      path: "d",
      name: "My Concerts",
      component: Dashboard
    },
    {
      path: "e",
      name: "My Tickets",
      component: Dashboard
    },
    {
      path: "icons",
      name: "Icons",
      component: Icons
    },
    {
      path: "maps",
      name: "Maps",
      component: Maps
    },
    {
      path: "notifications",
      name: "Notifications",
      component: Notifications
    },
    {
      path: "user",
      name: "User Profile",
      component: UserProfile
    },
    {
      path: "table",
      name: "Table List",
      component: TableList
    },
    {
      path: "typography",
      name: "Typography",
      component: Typography
    }
  ]

}];

export default routes;
