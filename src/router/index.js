import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import Student from '../views/Student'
import Enrollment from '../views/Enrollment'
import Scores from '../views/Scores'
import Inspections from '../views/Inspections'
import Tutorship from '../views/Tutorship'
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
    children:[
      {
        path:'student',
        component: Student,
        name:'student'
      },
      {
        path:'enrollment',
        component: Enrollment,
        name:'enrollment'
      },
      {
        path:'scores',
        component: Scores,
        name:'scores'
      },
      {
        path:'inspections',
        component: Inspections,
        name:'inspections'
      },
      {
        path:'tutorships',
        component: Tutorship,
        name:'tutorships'
      }
    ],
    beforeEnter: async (to,from,next) => {
      if (store.state.jwt && await store.dispatch('checkTokenLive')) next()
      else next({name:'login'})
    },
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
