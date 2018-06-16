import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/page/Welcome'
import Main from '@/page/Main'
import Match from '@/page/Match'
import Area from '@/page/Area'
import Mock from '@/page/Mock'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Welcome,
      beforeEnter: (to, from, next) => {
        next({name: 'main'})
      }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/match',
      name: 'match',
      component: Match
    },
    {
      path: '/area',
      name: 'area',
      component: Area
    },
    {
      path: '/mock',
      name: 'mock',
      component: Mock
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('router before', to.name, from.name)
  if (to.name === 'welcome') {
    next()
    return
  }

  if (to.name !== 'welcome' && !window.storage.get('user_id')) {
    next({name: 'welcome'})
    return
  }
  next()
})

export default router
