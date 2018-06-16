import Vue from 'vue'
import Router from 'vue-router'
import Dev from '@/page/Dev'
import Welcome from '@/page/Welcome'
import Main from '@/page/Main'
import LoginSns from '@/page/LoginSns'
import Login from '@/page/Login'
import CreateUser from '@/page/CreateUser'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Welcome,
      beforeEnter: (to, from, next) => {
        if (location.port === '10800') {
          next({name: 'dev'})
        } else {
          next({name: 'main'})
        }
      }
    },
    {
      path: '/dev',
      name: 'dev',
      component: Dev
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
      path: '/login-sns',
      name: 'login-sns',
      component: LoginSns
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: CreateUser
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('router before', to.name, from.name)
  if (to.name === 'dev') {
    next()
    return
  }

  if (to.name === 'login') {
    next()
    return
  }

  if (to.name === 'create-user') {
    next()
    return
  }

  if (to.name !== 'welcome' && !window.storage.get('code')) {
    next({name: 'welcome'})
    return
  }
  next()
})

export default router
