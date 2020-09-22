import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Gallery from '@/views/Gallery.vue'
import Book from '@/views/Book.vue'
import Podcast from '@/views/Podcast.vue'
import Marketplace from '@/views/Marketplace.vue'
import ErrorPage from '@/views/ErrorPage.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/galeri',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/buku-panduan',
    name: 'Book',
    component: Book
  },
  {
    path: '/podcast',
    name: 'Podcast',
    component: Podcast
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: Marketplace
  },
  {
    path: '/*',
    name: 'ErrorPage',
    component: ErrorPage
  },
]

const router = new VueRouter({
  mode: 'history', //removes # (hashtag) from url
  base: '/',
  fallback: true,
  routes
})

// add guard
router.beforeEach((to, from, next) => {
  // check for requiredAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check if NOT logged in
    if (!firebase.auth().currentUser || firebase.auth().currentUser === null) {
      // go to login page
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // process to route
      next();
    }
  } else {
    next()
  }
})

export default router