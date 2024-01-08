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
      path: '/UserInfoPage',
      name: 'UserInfoPage',
      component: () => import('../views/UserInfoPage.vue')
    },
    {
      path: '/FavoratePage',
      name: 'FavoratePage',
      // component: () => import('../views/FavoratePage.vue')
    }
  ]
})

export default router
