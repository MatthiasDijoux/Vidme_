import Vue from "vue";
import Router from "vue-router";
import Home from './components/views/Home.vue';
import Room from './components/views/Room.vue';
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
