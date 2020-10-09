import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
Vue.use(VueRouter)
// VUE-Router之解决 Navigating to current location (XXX) is not allowed
const [routerPush, routerReplace] = [VueRouter.prototype.push, VueRouter.prototype.replace]
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
}
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error => error);
}

  const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/list', component: CategoryList },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/items/create', component: ItemEdit },
      { path: '/items/list', component: ItemList },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/Heroes/create', component: HeroEdit },
      { path: '/Heroes/list', component: HeroList },
      { path: '/Heroes/edit/:id', component: HeroEdit, props: true },
      { path: '/Articles/create', component: ArticleEdit },
      { path: '/Articles/list', component: ArticleList },
      { path: '/Articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/Ads/create', component: AdEdit },
      { path: '/Ads/list', component: AdList },
      { path: '/Ads/edit/:id', component: AdEdit, props: true },
      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/list', component: AdminUserList },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  // console.log(to.meta)
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})
export default router
