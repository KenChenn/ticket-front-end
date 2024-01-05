import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
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
    }
  ]
})

export default router
