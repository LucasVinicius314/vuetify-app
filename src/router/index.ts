import VueRouter, { RouteConfig } from 'vue-router'

import About from '../views/About.vue'
import Brands from '../views/Brands.vue'
import Categories from '../views/Categories.vue'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Vue from 'vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/brands',
    name: 'Brands',
    component: Brands,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

const router = new VueRouter({
  routes
})

export default router
