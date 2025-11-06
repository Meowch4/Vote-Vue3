import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SelectCreate from '@/views/SelectCreate.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '/',
          redirect: '/select-create',
        },
        {
          path: 'select-create',
          // alias: '',
          component: SelectCreate,
        },
        {
          path: 'me',
          component: () => import('../views/Me.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/create',
      component: () => import('../views/CreateVote.vue')
    },
    {
      path: '/vote/:id',
      component: () => import('../views/Vote.vue'),
    },
    {
      path: '/my-votes',
      component: () => import('../views/MyVotes.vue'),
    },
    {
      path: '/my-settings',
      component: () => import('../views/MySettings.vue'),
    },
    {
      path: '/register',
      component: () => import('../views/Register.vue'),
    },
  ],
})

export default router
