import Vue from "vue";
import Router from "vue-router";
import Home from './Home.vue';
import Room from './views/Room.vue';
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/room",
      name: "room",
      component: Room,
      props: true
    },
  ]
});
