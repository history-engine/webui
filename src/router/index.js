/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/user/login',
    component: () => import('@/pages/user/login.vue')
  },
  {
    path: '/user/register',
    component: () => import('@/pages/user/register.vue')
  },
  {
    path: '/search',
    component: () => import('@/pages/search.vue')
  },
  {
    path: '/about',
    component: () => import('@/pages/about.vue')
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
  routes: routes
})

export default router
