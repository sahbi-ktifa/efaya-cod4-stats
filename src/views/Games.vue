<template>
  <div class="games">
    <ul>
      <li v-for="game in games">
        <img class="map-preview" :src="game.mapPreview" alt="map-preview">
        <router-link :to="'game/' + game.map" tag="h3">{{game.map}}</router-link>
        <span>{{formatDate(game.date)}}</span>
        <span>
          Players: <strong>{{game.players.length}}</strong><br/>
          Round1: <strong>{{game.gameRefs[0].alliesScore}}</strong> / <strong>{{game.gameRefs[0].axisScore}}</strong><br/>
          Round2: <strong>{{game.gameRefs[1].axisScore}}</strong> / <strong>{{game.gameRefs[1].alliesScore}}</strong><br/>
          Final Score: <strong>{{game.gameRefs[0].alliesScore + game.gameRefs[1].axisScore}}</strong> / <strong>{{game.gameRefs[0].axisScore + game.gameRefs[1].alliesScore}}</strong>
        </span>
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
import {format} from "date-fns";
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
    return game.mod.startsWith("efaya_mod");
  }

  public isIMMMod(game: Game) {
    return game.mod.startsWith("imm");
  }

  public formatDate(date: Date): string {
    return !isNaN(date.getTime()) ? format(date, "dd/MM/yyyy") : "";
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
    grid-template-columns: 275px 250px 100px 150px 150px max-content;
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
  h3 {
    cursor: pointer;
  }
</style>
