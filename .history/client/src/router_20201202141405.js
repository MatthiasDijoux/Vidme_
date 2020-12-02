import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import HomeAdmin from './views/HomeAdmin.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Room from './views/Room.vue';

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
  const publicPages = ['/','/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  const room = localStorage.getItem('room');
console.log("room : ",room)
  // trying to access a restricted page + not logged in
  // redirect to login page
  
  if (!authRequired || loggedIn || room !== null) {    
    next();
  } else {
    next('/home');
  }
});

export default router
