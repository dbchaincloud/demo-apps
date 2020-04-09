import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {hasPassphrase} from 'dbchain-js-client'

import Friends from        "../views/Friends.vue";
import AddFriend from      "../views/AddFriend.vue";
import Account from        "../views/Account.vue";
import AccountNew from     "../views/AccountNew.vue";
import AccountSignin from  "../views/AccountSignin.vue";
import Exit from           "../views/Exit.vue";
import Weixin from         "../views/Weixin.vue";

import BlogIndex from      "../views/blog/Index.vue"
import BlogPost  from      "../views/blog/Post.vue"
import BlogUser  from      "../views/blog/User.vue"

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
  },
  {
    path: "/blog/user",
    name: "BlogUser",
    component: BlogUser
  },
  {
    path: "/blog/post/:id",
    name: "BlogPost",
    component: BlogPost
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // if in weixin, jump to winxin page
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    if( to.name != 'Weixin') {
      next({ name: 'Weixin' });
    } else {
      next();
    }
    return
  }

  if (hasPassphrase()) {
    next();
  } else if(to.name == 'Home' || to.name == 'Account' || to.name == 'AccountNew' ||
            to.name == 'AccountSignin' || to.name =='AddFriend' || to.name == 'Features') {
    next();
  } else {
    next({ name: 'Account' });
  }
});

export default router
