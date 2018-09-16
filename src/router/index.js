import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from 'components/HelloWorld'
// import SearchBar from 'components/SearchBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['components/Library.vue'], resolve),
      children: []
    },
    {
      path: '/library',
      name: 'Library',
      component: resolve => require(['components/Library.vue'], resolve)
    }
  ]
})
