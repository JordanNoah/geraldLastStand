import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component: Login,
    beforeEnter:(to,from,next) => {
      if (!store.state.jwt) next()
      else next({name:'dashboard'})
    },
    name:'login'
  },
  {
    path:'/dashboard',
    component: Dashboard,
    name:'dashboard',
    beforeEnter: (to,from,next) => {
      if (store.state.jwt) next()
      else next({name:'login'})
    }
  },
  {
    path:'/',
    redirect:{
      name:'dashboard'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
