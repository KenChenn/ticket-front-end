import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Soon from'../views/Soon.vue'
import Popular from'../views/Popular.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('../views/Home.vue'),
      children:[
        {
        path:'/',
        component:Popular,
      },
      {
        path:'Soon',
        component:Soon,
      },{
        path:'Popular',
        component:Popular,
      }],
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
    }
  ]
})

export default router
