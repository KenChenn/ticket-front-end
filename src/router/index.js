import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/LoginPage',
      name: 'LoginPage',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/SignupPage',
      name: 'SignupPage',
      component: () => import('../views/SignupPage.vue')
    },
    {
      path: '/OrderTracking',
      name: 'OrderTracking',
      component: () => import('../views/OrderTracking.vue')
    },
    {
      path: '/UserInfoPage',
      name: 'UserInfoPage',
      component: () => import('../views/UserInfoPage.vue')
    },
    {
      path: '/FavoratePage',
      name: 'FavoratePage',
      component: () => import('../views/FavoratePage.vue')
    },
    {
      path: '/UserRewritePage',
      name: 'UserRewritePage',
      component: () => import('../views/UserRewritePage.vue')
    },
    {
      path: '/CreateHost',
      name: 'CreateHost',
      component: () => import('../views/CreateHost.vue')
    },
    {
      path: '/EditHost',
      name: 'EditHost',
      component: () => import('../views/EditHost.vue')
    },
    {
      path: '/BuyTicketPage',
      name: 'BuyTicketPage',
      component: () => import('../views/BuyTicketPage.vue')
    },
    {
      path: '/CreateActivities',
      name: 'CreateActivities',
      component: () => import('../views/CreateActivities.vue')
    },
    {
      path: '/AdminLoginPage',
      name: 'AdminLoginPage',
      component: () => import('../views/AdminLoginPage.vue')
    },
  ]
})

export default router
