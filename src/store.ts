import Vue from "vue";
import VueX from "vuex";
import { orderBy } from "lodash";
import Game from "@/model/Game";

Vue.use(VueX);

export default new VueX.Store({
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
    }
  },
  mutations: {
    gamesRetrieved(state, games: Game[]) {
      state.games = games;
      state.games = orderBy(state.games, ["date"], ["desc"]);
    },
    championshipGamesRetrieved(state, games: Game[]) {
      state.championshipGames = games;
    },
    championshipScrimsRetrieved(state, games: Game[]) {
      state.scrims = games;
    },
  }
});
