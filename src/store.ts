import Vue from "vue";
import VueX from "vuex";
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
    gameRetrieved(state, game: Game) {
      state.games.push(game);
    }
  }
});
