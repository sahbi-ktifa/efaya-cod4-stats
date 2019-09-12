<template>
  <div class="players">
    <ul>
      <li>
        <span></span>
        <strong>Best score overall</strong>
        <strong>Best kills overall</strong>
        <strong>Best ratio overall</strong>
      </li>
      <li v-for="dataForPlayer in dataForPlayers">
        <strong>{{dataForPlayer.playerName}}</strong>
        <span>{{dataForPlayer.bestScore}}</span>
        <span>{{dataForPlayer.bestKills}}</span>
        <span>{{dataForPlayer.bestRatio}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {orderBy} from "lodash";
import Game from "@/model/Game";
import {PlayerGlobalData} from "@/model/Player";

@Component({
  computed: {
    ...mapGetters({
      games: "games"
    })
  }
})
export default class Games extends Vue {
  protected games!: Game[];
  private dataForPlayers: PlayerGlobalData[] = [];

  public created() {
    const dataForPlayersMap: Map<string, PlayerGlobalData> = new Map();
    this.games.forEach((game) => {
      game.players.forEach((player) => {
        let dataForPlayer = dataForPlayersMap.get(player.playerName);
        if (!dataForPlayer) {
          dataForPlayer = new PlayerGlobalData(player.playerName);
        }
        if (player.totalScore > dataForPlayer!!.bestScore) {
          dataForPlayer!!.bestScore = player.totalScore;
        }
        if (player.totalKills > dataForPlayer!!.bestKills) {
          dataForPlayer!!.bestKills = player.totalKills;
        }
        if (player.globalRatio > dataForPlayer!!.bestRatio) {
          dataForPlayer!!.bestRatio = player.globalRatio;
        }
        dataForPlayersMap.set(player.playerName, dataForPlayer);
      });
    });
    dataForPlayersMap.forEach((data) => {
      this.dataForPlayers.push(data);
    });
    this.dataForPlayers = orderBy(this.dataForPlayers, ["playerName"], ["asc"]);
  }
}
</script>

<style scoped>
  .players {
    padding: 30px;
    text-align: left;
  }
  .players > ul > li {
    display: grid;
    grid-template-columns: 150px 100px 100px 100px;
    grid-gap: 0 20px;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid lightgray;
  }
</style>
