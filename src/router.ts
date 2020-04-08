import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "games",
      component: () => import(/* webpackChunkName: "games" */ "./views/Games.vue"),
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
      path: "/player/:guid",
      name: "player",
      component: () => import(/* webpackChunkName: "player" */ "./views/Player.vue"),
    },
    {
      path: "/halloffame",
      name: "halloffame",
      component: () => import(/* webpackChunkName: "halloffame" */ "./views/HallOfFame.vue"),
    },
    {
      path: "/parser",
      name: "parser",
      component: () => import(/* webpackChunkName: "logsparser" */ "./views/LogsParser.vue"),
    },
    {
      path: "/matchmaking",
      name: "matchmaking",
      component: () => import(/* webpackChunkName: "logsparser" */ "./views/MatchMaking.vue"),
    },
    {
      path: "/championship",
      name: "championship",
      component: () => import(/* webpackChunkName: "logsparser" */ "./views/Championship.vue"),
    }
  ],
});
