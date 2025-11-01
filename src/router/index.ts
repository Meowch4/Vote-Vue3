import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SelectCreate from '@/views/SelectCreate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      component: () => import('../views/CreateVote.vue'),
    },
    {
      path: '/vote/:id',
      component: () => import('../views/Vote.vue'),
    },
    {
      path: '/my-votes',
      component: () => import('../views/MyVotes.vue'),
    },
  ],
})

export default router
