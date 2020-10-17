import BaseLayout from "@/pages/Layout/BaseLayout.vue";

import ConcertList from "@/pages/ConcertList.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import ConcertDetail from "./pages/ConcertDetail";
import ConcertCreate from "./pages/ConcertCreate";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthLayout from "@/pages/Layout/AuthLayout";


const routes = [
  {
    path: "/",
    component: AuthLayout,
    redirect: "dashboard",
    children: [
      {
        path: "sign-in",
        name: 'sign-in',
        component: SignIn,
      },
      {
        path: "sign-up",
        name: 'sign-up',
        component: SignUp,
      }
    ]
  },
  {
    path: "/",
    component: BaseLayout,
    redirect: "dashboard",
    children:[
      {
        path: "concerts/create",
        name: "concert-create",
        component: ConcertCreate,
      },
      {
        path: "concerts/:pk",
        name: "concert-detail",
        component: ConcertDetail,
      },
      {
        path: "concerts",
        name: "concert-list",
        component: ConcertList,
      },
      {
        path: "dashboard",
        name: "New & Hot",
        component: ConcertList
      },
      {
        path: "a",
        name: "New & Hot",
        component: ConcertList
      },
      {
        path: "b",
        name: "Ongoing",
        component: ConcertList
      },
      {
        path: "c",
        name: "Upcoming",
        component: ConcertList
      },
      {
        path: "d",
        name: "My Concerts",
        component: ConcertList
      },
      {
        path: "e",
        name: "My Tickets",
        component: ConcertList
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
