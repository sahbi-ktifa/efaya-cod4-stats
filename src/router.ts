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
      path: "/game/:map",
      name: "game",
      component: () => import(/* webpackChunkName: "game" */ "./views/Game.vue"),
    },
    {
      path: "/players",
      name: "players",
      component: () => import(/* webpackChunkName: "players" */ "./views/Players.vue"),
    },
    {
      path: "/halloffame",
      name: "halloffame",
      component: () => import(/* webpackChunkName: "halloffame" */ "./views/HallOfFame.vue"),
    }
  ],
});
