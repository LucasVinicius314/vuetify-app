import VueRouter, { RouteConfig } from 'vue-router'

import About from '../views/About.vue'
import Categories from '../views/Categories.vue'
import Home from '../views/Home.vue'
import Vue from 'vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
]

const router = new VueRouter({
  routes
})

export default router
