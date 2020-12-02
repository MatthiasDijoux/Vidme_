import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import HomeAdmin from '../components/HomeAdmin.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Room from '../components/Room.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/home-admin',
      component: HomeAdmin
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/room',
      name: "room",
      component: Room,
      props: true
      
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('../components/Admin.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/','/login', '/register', '/home', '/room'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  const roomId = localStorage.getItem('roomId');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn && !roomId) {
    next('/home');
  } else {
    next();
  }
});

export default router
