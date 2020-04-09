import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Friends from        "../views/Friends.vue";
import AddFriend from      "../views/AddFriend.vue";
import Account from        "../views/Account.vue";
import AccountNew from     "../views/AccountNew.vue";
import AccountSignin from  "../views/AccountSignin.vue";
import Exit from           "../views/Exit.vue";
import Weixin from         "../views/Weixin.vue";

import BlogIndex from '../views/blog/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/addfriend/:name/:address",
    name: "AddFriend",
    component: AddFriend
  },
  {
    path: "/friends",
    name: "Friends",
    component: Friends
  },
  {
    path: "/account",
    name: "Account",
    component: Account
  },
  {
    path: "/account/new",
    name: "AccountNew",
    component: AccountNew
  },
  {
    path: "/account/signin",
    name: "AccountSignin",
    component: AccountSignin
  },
  {
    path: "/weixin",
    name: "Weixin",
    component: Weixin
  },
  {
    path: "/exit",
    name: "Exit",
    component: Exit
  },

  {
    path: '/blog',
    name: 'BlogIndex',
    component: BlogIndex
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
