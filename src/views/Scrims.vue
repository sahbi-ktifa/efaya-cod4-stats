<template>
  <div class="games">
    <h3>Scrims 2021</h3>
    <ul>
      <li v-for="game in scrims" @click="goToGame(game)">
        <img class="map-preview" :src="game.mapPreview" alt="map-preview">
        <div class="game-summary">
          <h4>{{mapNamer(game.map)}} vs {{ opponent(game) }}</h4>
          <h4 class="game-date">{{formatDate(game.date)}}</h4>
          <div class="players-summary">Joueurs : <strong>{{game.players.length}}</strong></div>
          <span class="round-summary">
            Manche 1 : <strong>{{game.gameRefs[0].alliesScore}}</strong> / <strong>{{game.gameRefs[0].axisScore}}</strong><br/>
            Manche 2 : <strong>{{game.gameRefs[1].axisScore}}</strong> / <strong>{{game.gameRefs[1].alliesScore}}</strong><br/>
            Score Final : <strong>{{game.gameRefs[0].alliesScore + game.gameRefs[1].axisScore}}</strong> / <strong>{{game.gameRefs[0].axisScore + game.gameRefs[1].alliesScore}}</strong><br/>
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
import {Component, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {format} from "date-fns";
import Game from "@/model/Game";
import TimeUtils from "@/services/TimeUtils";

@Component({
  computed: {
    ...mapGetters({
      scrims: "scrims"
    })
  }
})
export default class Scrims extends Vue {
  protected scrims!: Game[];
  private xiGameIds = [
    "ZWZheWFfdjJfbXBfZWZhX21hcmtldF8wLjgzNDQzNTA1NTM0NDkzMTM=",
    "ZWZheWFfdjJfbXBfY2FyZW50YW5fMC42MjM2Njk1ODgyNDU5Njkx",
    "ZWZheWFfdjJfbXBfY3Jhc2hfMC41NzY2ODA2NzkzMjkwOA==",
    "ZWZheWFfdjJfbXBfc3RyaWtlXzAuOTUzMDUxNDI1ODAwMzc3OQ==",
  ];
  private rejekzGameIds = [
    "ZWZheWFfdjJfbXBfZWZhX2NhbmFsc18wLjA2MDM4NzMzNTg3MTAxNzYz",
    "ZWZheWFfdjJfbXBfZGVzdHJveWVkX3ZpbGxhZ2VfMC4zMjQzMDQyMzM1NTc4ODc4NA==",
    "ZWZheWFfdjJfbXBfYml0dGVyXzAuMzU5MTAyNzI5NTI5ODYxNjY=",
  ];

  public duration(game: Game) {
    if (game.gameRefs[0].startTime) {
      const duration = (game.gameRefs[0].endTime - game.gameRefs[0].startTime) + (game.gameRefs[1].endTime - game.gameRefs[1].startTime);
      return TimeUtils.getReadableDiffTime(duration);
    }
    return null;
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
    this.$router.push("/game/scrims" + game.id);
  }

  public mapNamer(mapName: string): string {
    return mapName.replace("mp_", "").replace(/_/g, " ").toUpperCase();
  }

  public opponent(game: Game): string {
    if (this.xiGameIds.indexOf(game.id) > -1 ) {
      return "XI";
    } else {
      if (this.rejekzGameIds.indexOf(game.id) > -1 ) {
            return "Rejekz";
          }
    }
    return "N/A";
  }
}
</script>

<style scoped>
  .games {
    padding: 20px 200px 20px 20px;
    text-align: left;
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
