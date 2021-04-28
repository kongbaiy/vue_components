import Vue from 'vue'
import Router from 'vue-router'

import Demo from '@/app/pages/demo'
import NotFound from '@/components/hint/NotFound'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/demo'
    },

    {
      path: '/demo',
      name: 'demo',
      component: Demo,
      children: [
        {
          path: '/form',
          name: 'form',
          component: () => import('@/app/pages/demo/Form')
        },
        {
          path: '/calendar',
          name: 'calendar',
          component: () => import('@/app/components/calendar')
        },
        {
          path: '/input',
          name: 'input',
          component: () => import('@/app/pages/demo/Input')
        },
        {
          path: '/list',
          name: 'list',
          component: () => import('@/app/pages/demo/List')
        }
      ]
    },

    {
      path: '*',
      component: NotFound
    }
  ]
});
