import Vue from 'vue'
import Router from 'vue-router'

import Calendar from '@/app/components/calendar'
import NotFound from '@/components/hint/NotFound'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/calendar'
    },

    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },

    {
      path: '*',
      component: NotFound
    }
  ]
});
