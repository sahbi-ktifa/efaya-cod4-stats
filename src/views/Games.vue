<template>
  <div class="games">
    <h3>Season: <strong @click="goToSeason('s1!')" :class="{'selected' : seasonKey === 's18'}">2022/2023</strong>
      <strong @click="goToSeason('s17')" :class="{'selected' : seasonKey === 's17'}">2021/2022</strong>
      <strong @click="goToSeason('s16')" :class="{'selected' : seasonKey === 's16'}">2020/2021</strong></h3>

    <ul>
      <li v-for="game in games" @click="goToGame(game)">
        <img class="map-preview" :src="game.mapPreview" alt="map-preview">
        <div class="game-summary">
          <h4>{{mapNamer(game.map)}}</h4>
          <h4 class="game-date">{{formatDate(game.date)}}</h4>
          <div class="players-summary">Joueurs : <strong>{{game.players.length}}</strong></div>
          <span class="round-summary">
            Manche 1 : <strong>{{team1Round1(game.gameRefs[0])}}</strong> / <strong>{{team2Round2(game.gameRefs[0])}}</strong><br/>
            Manche 2 : <strong>{{team1Round2(game.gameRefs[1])}}</strong> / <strong>{{team2Round2(game.gameRefs[1])}}</strong><br/>
            Score Final : <strong>{{team1Round1(game.gameRefs[0]) + team1Round2(game.gameRefs[1])}}</strong> / <strong>{{team2Round1(game.gameRefs[0]) + team2Round2(game.gameRefs[1])}}</strong><br/>
            <span v-if="duration(game)">Durée : <strong>{{duration(game)}}</strong></span>
          </span>
          <img class="mod-logo" alt="Mod logo" src="../assets/efaya_mod.png" v-if="isEfayaMod(game)">
          <img class="mod-logo" alt="Mod logo" src="../assets/efaya_v2.png" v-if="isEfayaModV2(game)">
          <img class="mod-logo" alt="Mod logo" src="../assets/promod.jpg" v-if="isPromod(game)">
          <img class="mod-logo" alt="Mod logo" src="../assets/imm.png" v-if="isIMMMod(game)">
          <img class="mod-logo" alt="Mod logo" src="../assets/ww2.png" v-if="isWW2Mod(game)">
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {format} from "date-fns";
import Game, {GameRef} from "@/model/Game";
import TimeUtils from "@/services/TimeUtils";
import {DataService} from "@/services/DataService";

@Component({
  computed: {
    ...mapGetters({
      games: "games"
    })
  }
})
export default class Games extends Vue {
  @Inject("dataService") public dataService!: DataService;

  protected games!: Game[];
  private seasonKey: string = "s18";

  public team1Round1(gameRef: GameRef): number {
    return gameRef.alliesScore;
  }

  public team2Round1(gameRef: GameRef): number {
    return gameRef.axisScore;
  }

  public team1Round2(gameRef: GameRef): number {
    return gameRef.switchGameRef ? gameRef.alliesScore : gameRef.axisScore;
  }

  public team2Round2(gameRef: GameRef): number {
    return gameRef.switchGameRef ? gameRef.axisScore : gameRef.alliesScore;
  }

  public duration(game: Game) {
    if (game.gameRefs[0].startTime) {
      const duration = (game.gameRefs[0].endTime - game.gameRefs[0].startTime) + (game.gameRefs[1].endTime - game.gameRefs[1].startTime);
      return TimeUtils.getReadableDiffTime(duration);
    }
    return null;
  }

  public async goToSeason(season: string) {
    if (this.seasonKey != season) {
      this.seasonKey = season;
      const games = await this.dataService.retrieveGames(this.seasonKey);
      this.$store.commit("gamesRetrieved", games);
    }
  }

  public isEfayaMod(game: Game) {
    return game.mod.startsWith("efaya_mod");
  }

  public isEfayaModV2(game: Game) {
    return game.mod.startsWith("efaya_v2");
  }

  public isIMMMod(game: Game) {
    return game.mod.startsWith("imm");
  }

  public isWW2Mod(game: Game) {
    return game.mod.startsWith("ww2");
  }

  public isPromod(game: Game) {
    return game.mod.startsWith("pml");
  }

  public formatDate(date: Date): string {
    return !isNaN(date.getTime()) ? format(date, "dd/MM/yyyy") : "";
  }

  public goToGame(game: Game) {
    this.$router.push("/game/" + game.map);
  }

  public mapNamer(mapName: string): string {
    return mapName.replace("mp_", "").replace(/_/g, " ").toUpperCase();
  }
}
</script>

<style scoped>
  .games {
    padding: 20px 200px 20px 20px;
    text-align: left;
  }
  .games h3 > strong {
    cursor: pointer;
    margin-right: 10px;
  }
  .games h3 > strong.selected {
    color: #36ebff;
    font-style: normal;
    font-weight: bold;
  }
  .games h3 > strong:hover {
    color: #36ebff;
  }
  .games > ul {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 20px 20px;
    align-items: center;
    max-width: 1080px;
  }
  .games > ul > li {
    border: solid 2px lightgrey;
    display: grid;
    grid-template-columns: 50% 50%;
    height: 175px;
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
  .games .map-preview {
    height: 100%;
    max-height: 175px;
    width: calc(100%);
    object-fit: cover;
  }
  .game-summary {
    padding: 10px;
    position: relative;
  }
  .game-summary h4 {
    text-transform: uppercase;
    position: absolute;
    left: 10px;
    margin-top: 0;
  }
  .game-summary h4.game-date {
    right: 10px;
    left: initial;
    margin-top: 25px;
  }
  div.players-summary {
    text-transform: uppercase;
    color: #36ebff;
    font-weight: bold;
    margin-top: 25px;
  }
  div.players-summary strong {
    color: white;
  }
  .round-summary {
    margin-top: 20px;
    display: block;
  }
  .mod-logo {
    position: absolute;
    width: 65px;
    right: 0;
    bottom: 10px;
  }

  @media (max-width: 1150px) {
    .games {
      padding: 15px;
    }
    .games > ul {
      padding: 0;
      grid-template-columns: 100%;
    }
    div.players-summary {
      margin-top: 45px;
    }
    .round-summary {
      margin-top: 0;
    }
    .mod-logo {
      width: 50px;
      top: 0;
      right: 0;
    }
  }
</style>
