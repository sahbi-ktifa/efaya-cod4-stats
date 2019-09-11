import Vue from "vue";
import Router from "vue-router";
import Games from "./views/Games.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "games",
      component: Games,
    },
    {
      path: "/players",
      name: "players",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/Players.vue"),
    },
    {
      path: "/halloffame",
      name: "halloffame",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/Players.vue"),
    }
  ],
});
