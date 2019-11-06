<template>
  <div class="players">
    <ul>
      <li>
        <span></span>
        <strong>Best score overall</strong>
        <strong>Best kills overall</strong>
        <strong>Best ratio overall</strong>
        <strong>Best grenade overall</strong>
        <strong>Best knife overall</strong>
        <strong>Current mood</strong>
      </li>
      <li v-for="dataForPlayer in dataForPlayers">
        <router-link :to="'player/' + dataForPlayer.playerRef.guid" tag="strong" class="name">{{dataForPlayer.playerRef.playerName}}</router-link>
        <span>{{dataForPlayer.bestScore}}</span>
        <span>{{dataForPlayer.bestKills}}</span>
        <span>{{dataForPlayer.bestRatio}}</span>
        <span>{{dataForPlayer.bestNades}}</span>
        <span>{{dataForPlayer.bestKnifes}}</span>
        <span>
          <span v-for="mood in dataForPlayer.currentMood.slice(Math.max(dataForPlayer.currentMood.length - 5, 1))">
            <img alt="" :title="mood.mapRef + ' (' + mood.date + ')'" @click="goToGame(mood)" src="../assets/green.png" v-if="mood.win === true" class="mood"/>
            <img alt="" :title="mood.mapRef + ' (' + mood.date + ')'" @click="goToGame(mood)" src="../assets/red.png" v-if="mood.win === false && mood.played === true" class="mood"/>
            <img alt="" src="../assets/grey.png" v-if="mood.win === false && mood.played === false" class="mood"/>
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {orderBy} from "lodash";
import Game from "@/model/Game";
import {GameMood, PlayerGlobalData} from "@/model/Player";
import {format} from "date-fns";

@Component({
  computed: {
    ...mapGetters({
      games: "games"
    })
  }
})
export default class Players extends Vue {
  protected games!: Game[];
  private dataForPlayers: PlayerGlobalData[] = [];

  public created() {
    const dataForPlayersMap: Map<string, PlayerGlobalData> = new Map();
    const orderedGames = orderBy(this.games, ["date"], ["asc"]);
    orderedGames.forEach((game) => {
      game.players.forEach((player) => {
        let dataForPlayer = dataForPlayersMap.get(player.playerRef.guid);
        if (!dataForPlayer) {
          dataForPlayer = new PlayerGlobalData(player.playerRef, orderedGames.length);
          dataForPlayersMap.set(player.playerRef.guid, dataForPlayer);
        }
      });
    });
    let gameIndex = 0;
    orderedGames.forEach((game) => {
      let maxScore = 0;
      game.players.forEach((p) => {
        if (p.totalPoints > maxScore) {
          maxScore = p.totalPoints;
        }
      });

      game.players.forEach((player) => {
        const dataForPlayer = dataForPlayersMap.get(player.playerRef.guid);
        if (player.totalScore > dataForPlayer!!.bestScore) {
          dataForPlayer!!.bestScore = player.totalScore;
        }
        if (player.totalKills > dataForPlayer!!.bestKills) {
          dataForPlayer!!.bestKills = player.totalKills;
        }
        if (player.globalRatio > dataForPlayer!!.bestRatio) {
          dataForPlayer!!.bestRatio = player.globalRatio;
        }
        if (player.grenadeKills > dataForPlayer!!.bestNades) {
          dataForPlayer!!.bestNades = player.grenadeKills;
        }
        if (player.meleeKills > dataForPlayer!!.bestKnifes) {
          dataForPlayer!!.bestKnifes = player.meleeKills;
        }
        dataForPlayer!!.currentMood[gameIndex].played = true;
        dataForPlayer!!.currentMood[gameIndex].win = player.totalPoints === maxScore;
        dataForPlayer!!.currentMood[gameIndex].mapRef = game.map;
        dataForPlayer!!.currentMood[gameIndex].date = format(game.date, "dd/MM/yyyy");
        dataForPlayersMap.set(player.playerRef.guid, dataForPlayer!!);
      });
      gameIndex++;
    });
    dataForPlayersMap.forEach((data) => {
      this.dataForPlayers.push(data);
    });
    this.dataForPlayers = orderBy(this.dataForPlayers, ["playerRef.playerName"], ["asc"]);
  }

  public goToGame(mood: GameMood) {
    this.$router.push(`game/${mood.mapRef}`);
  }
}
</script>

<style scoped>
  .players {
    padding: 30px;
    text-align: left;
  }
  .name {
    cursor: pointer;
  }
  .players > ul > li {
    display: grid;
    grid-template-columns: 150px 100px 100px 100px 100px 100px 150px;
    grid-gap: 0 20px;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid lightgray;
  }
  .mood {
    width: 20px;
    margin-left: 5px;
    cursor: pointer;
  }
</style>
