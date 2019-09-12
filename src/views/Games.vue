<template>
  <div class="games">
    <ul>
      <li v-for="game in games">
        <img class="map-preview" :src="game.mapPreview" alt="map-preview">
        <router-link :to="'game/' + game.map" tag="h3">{{game.map}}</router-link>
        <span>{{game.date}}</span>
        <span>Players: <strong>{{game.players.length}}</strong></span>
        <div>
          <img class="mod-logo" alt="Mod logo" src="../assets/efaya_mod.jpg" v-if="isEfayaMod(game)">
          <img class="mod-logo" alt="Mod logo" src="../assets/imm.jpg" v-if="isIMMMod(game)">
          <div align="center">{{game.mod}}</div>
        </div>
        <div>
          <a :href="game.twitchUrl" v-if="game.twitchUrl" target="_blank"><img class="twitch-logo" alt="Twitch logo" src="../assets/twitch.png"></a>
          <a :href="game.youtubeUrl" v-if="game.youtubeUrl" target="_blank"><img class="youtube-logo" alt="Youtube logo" src="../assets/youtube.png"></a>
        </div>
      </li>
    </ul>
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
export default class Games extends Vue {
  protected games!: Game[];

  public isEfayaMod(game: Game) {
    return game.mod === "Mod Efaya";
  }
  public isIMMMod(game: Game) {
    return game.mod === "IClan Mits Mod";
  }
}
</script>

<style scoped>
  .games {
    padding: 30px;
    text-align: left;
  }
  .games > ul > li {
    display: grid;
    grid-template-columns: 275px 200px 100px 100px 150px max-content;
    grid-gap: 0 20px;
    align-items: center;
    margin-bottom: 15px;
  }
  .games .map-preview {
    height: 150px;
  }
  .mod-logo {
    margin-left: auto;
    margin-right: auto;
    display: block;
    height: 75px;
  }
  .twitch-logo,.youtube-logo {
    width: 30px;
  }
  .youtube-logo {
    margin-left: 15px;
    margin-bottom: 5px;
  }
</style>
