import Vue from 'vue'
import VueRouter from 'vue-router'

import AuthGuard from './AuthGuard'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        postModalView: true
      }
    },
    {
      path:'/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/user/:username',
      name: 'user',
      component: () => import('./views/User.vue'),
      meta: {
        postModalView: true
      }
    },
    {
      path: '/post/:id',
      name: 'post',
      beforeEnter: (to, from, next) => {
        const postModalView = from.matched.some(view => view.meta && view.meta.postModalView)

        if (!postModalView) {
          to.matched[0].components = {
            default: () => import('./views/Post.vue'),
            // modal: false
          }
        }

        if (postModalView) {
          if (from.matched.length > 1) {
            const childrenView = from.matched.slice(1, from.matched.length)
            for (let view of childrenView) {
              to.matched.push(view)
            }
          }
          if (to.matched[0].components) {
            to.matched[0].components.default = from.matched[0].components.default
            to.matched[0].components.modal = () => import('./views/PostModal.vue')
          }
        }

        next()
      }
    },
    {
      path: '*',
      name: 'Error404',
      component: () => import('./views/Error404.vue')
    }
  ]
})
