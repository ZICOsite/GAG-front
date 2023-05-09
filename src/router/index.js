import { createRouter, createWebHistory, RouterView } from 'vue-router';
import Home from '../views/Home.vue';
import Error from '../views/404.vue';
import Tr from '../i18n/translation';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/:locale?",
      component: RouterView,
      beforeEnter: Tr.routeMiddleware,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
        },
        {
          path: 'company',
          name: 'company',
          component: () => import('../views/CompanyPage.vue')
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('../views/news/News.vue')
        },
        {
          path: 'news/:id',
          name: 'new',
          component: () => import('../views/news/NewsSingle.vue')
        },
        {
          path: 'jobs',
          name: 'jobs',
          component: () => import('../views/jobs/Jobs.vue')
        },
        {
          path: 'contacts',
          name: 'contacts',
          component: () => import('../views/contacts/Contacts.vue')
        },
        {
          path: 'delivery',
          name: 'delivery',
          component: () => import('../views/delivery/Delivery.vue')
        },
        {
          path: 'search',
          name: 'search',
          component: () => import('../views/search/Search.vue')
        },
        {
          path: 'catalog/:key=:id/:nextId?',
          name: 'catalog',
          component: () => import('../views/catalog/Catalog.vue'),
        },
        {
          path: 'details/:id',
          name: 'details',
          component: () => import('../views/details/Details.vue'),
        },
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'error',
      component: Error
    },
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router