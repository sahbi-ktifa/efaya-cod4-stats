import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "games",
      component: () => import("./views/Games.vue"),
    },
    {
      path: "/game/:map",
      name: "game",
      component: () => import("./views/Game.vue"),
    },
    {
      path: "/players",
      name: "players",
      component: () => import("./views/Players.vue"),
    },
    {
      path: "/player/:guid",
      name: "player",
      component: () => import("./views/Player.vue"),
    },
    {
      path: "/halloffame",
      name: "halloffame",
      component: () => import("./views/HallOfFame.vue"),
    },
    {
      path: "/parser",
      name: "parser",
      component: () => import("./views/LogsParser.vue"),
    },
    {
      path: "/matchmaking",
      name: "matchmaking",
      component: () => import("./views/MatchMaking.vue"),
    },
    {
      path: "/championship",
      name: "championship",
      component: () => import("./views/Championship.vue"),
    },
    {
      path: "/scrims",
      name: "scrims",
      component: () => import("./views/Scrims.vue"),
    },
  ],
});
