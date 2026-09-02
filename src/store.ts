import { createStore } from "vuex";
import type { Store } from "vuex";
import { orderBy } from "lodash";
import Game from "@/model/Game";

export default createStore({
  state: {
    games: Array<Game>(),
    championshipGames: Array<Game>(),
    scrims: Array<Game>(),
  },
  getters: {
    games: (state) => {
      return state.games;
    },
    scrims: (state) => {
      return state.scrims;
    },
    championshipGames: (state) => {
      return state.championshipGames;
    },
  },
  mutations: {
    gamesRetrieved(state, games: Game[]) {
      state.games = orderBy(games, ["date"], ["desc"]);
    },
    championshipGamesRetrieved(state, games: Game[]) {
      state.championshipGames = games;
    },
    championshipScrimsRetrieved(state, games: Game[]) {
      state.scrims = orderBy(games, ["date"], ["desc"]);
    },
  },
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<{ games: Game[]; championshipGames: Game[]; scrims: Game[] }>;
  }
}
