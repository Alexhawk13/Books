import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Main
  },
  {
    path: '/MyBookShelf',
    name: 'MyBookShelf',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/MyBookShelf.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router