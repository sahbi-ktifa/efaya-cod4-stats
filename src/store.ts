import Vue from "vue";
import VueX from "vuex";
import { orderBy } from "lodash";
import Game from "@/model/Game";

Vue.use(VueX);

export default new VueX.Store({
  state: {
    games: Array<Game>()
  },
  getters: {
    games: (state) => {
      return state.games;
    }
  },
  mutations: {
    gamesRetrieved(state, games: Game[]) {
      state.games = games;
      state.games = orderBy(state.games, ["date"], ["desc"]);
    }
  }
});
