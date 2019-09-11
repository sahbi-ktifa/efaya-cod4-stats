<template>
  <div class="game">
    A game on {{game.map}}
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import Game from "@/model/Game";

@Component({
  computed: {
    ...mapGetters({
      games: "games"
    })
  }
})
export default class GameDetails extends Vue {
  public game!: Game;
  protected games!: Game[];

  public created() {
    // @ts-ignore
    this.game = this.games.filter((game) => game.map === this.$route.params.map)[0];
  }

}
</script>

<style scoped>

</style>
