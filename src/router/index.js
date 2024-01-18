import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import Soon from "../views/Soon.vue";
import Popular from "../views/Popular.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
      children: [
        {
          path: "/",
          component: Popular,
        },
        {
          path: "Soon",
          component: Soon,
        },
        {
          path: "Popular",
          component: Popular,
        },
      ],
    },
    {
      path: "/LoginPage",
      name: "LoginPage",
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/SignupPage",
      name: "SignupPage",
      component: () => import("../views/SignupPage.vue"),
    },
    {
      path: "/OrderTracking",
      name: "OrderTracking",
      component: () => import("../views/OrderTracking.vue"),
    },
    {
      path: "/UserInfoPage",
      name: "UserInfoPage",
      component: () => import("../views/UserInfoPage.vue"),
    },
    {
      path: "/FavoratePage",
      name: "FavoratePage",
      component: () => import("../views/FavoratePage.vue"),
    },
    {
      path: "/UserRewritePage",
      name: "UserRewritePage",
      component: () => import("../views/UserRewritePage.vue"),
    },
    {
      path: "/CreateHost",
      name: "CreateHost",
      component: () => import("../views/CreateHost.vue"),
    },
    {
      path: '/EditHost',
      name: 'EditHost',
      component: () => import('../views/EditHost.vue')
    },
    {
      path: "/BuyTicketPage",
      name: "BuyTicketPage",
      component: () => import("../views/BuyTicketPage.vue"),
    },
    {
      path: "/ActivityAndHostPage",
      name: "ActivityAndHostPage",
      component: () => import("../views/ActivityAndHostPage.vue"),
    },
    {
      path: "/CreateActivities",
      name: "CreateActivities",
      component: () => import("../views/CreateActivities.vue"),
    },
    {
      path: "/EditingActivity",
      name: "EditingActivity",
      component: () => import("../views/EditingActivity.vue"),
    },
    {
      path: "/AdminLoginPage",
      name: "AdminLoginPage",
      component: () => import("../views/AdminLoginPage.vue"),
    },
    {
      path: "/SessionsAndSeats",
      name: "SessionsAndSeats",
      component: () => import("../views/SessionsAndSeats.vue"),
    },
    {
      path: "/Detail/",
      name: "Detail",
      component: () => import("../views/Detail.vue"),
    },
    {
      path: "/Detail/:codename",
      name: "Detail/:codename",
      component: () => import("../views/Detail.vue"),
    },
    { 
      path: "/BuyNoticePage",
      name: "BuyNoticePage",
      component: () => import("../views/BuyNoticePage.vue"),
    },
    {
      path: "/TicketNoticePage",
      name: "TicketNoticePage",
      component: () => import("../views/TicketNoticePage.vue"),
    },
    {
      path: "/GetTicketPage",
      name: "GetTicketPage",
      component: () => import("../views/GetTicketPage.vue"),
    },
    {
      path: "/CencelTicketPage",
      name: "CencelTicketPage",
      component: () => import("../views/CencelTicketPage.vue"),
    },
    {
      path: "/EditPwdPage",
      name: "EditPwdPage",
      component: () => import("../views/EditPwdPage.vue"),
    },
    {
      path: "/ManageHostPage",
      name: "ManageHostPage",
      component: () => import("../views/ManageHostPage.vue")
    },
    {
      path: "/Introduction",
      name: "Introduction",
      component: () => import("../views/Introduction.vue"),
    },
    {
      path: "/EditSessionsAndSeats",
      name: "EditSessionsAndSeats",
      component: () => import("../views/EditSessionsAndSeats.vue"),
    },
  ],
});

export default router;
