<template>
  <div class="players">
    <ul>
      <li>
        <strong class="header" @click="changeSort('playerRef.playerName')" :class="{'active': sortKey === 'playerRef.playerName'}">Joueur</strong>
        <strong class="header" @click="changeSort('bestScore')" :class="{'active': sortKey === 'bestScore'}">Meilleur score dans une partie</strong>
        <strong class="header" @click="changeSort('bestKills')" :class="{'active': sortKey === 'bestKills'}">Le plus de kill dans une partie</strong>
        <strong class="header" @click="changeSort('bestRatio')" :class="{'active': sortKey === 'bestRatio'}">Meilleur ratio dans une partie</strong>
        <strong class="header" @click="changeSort('bestNades')" :class="{'active': sortKey === 'bestNades'}">Kill à la grenade dans une partie</strong>
        <strong class="header" @click="changeSort('bestKnifes')" :class="{'active': sortKey === 'bestKnifes'}">Kill au couteau dans une partie</strong>
        <strong class="header" @click="changeSort('bestMedic')" :class="{'active': sortKey === 'bestMedic'}">Sauvetage dans une partie</strong>
        <strong class="header" @click="changeSort('bestExtermination')" :class="{'active': sortKey === 'bestExtermination'}">Kill confirmé dans une partie</strong>
        <strong class="header" @click="changeSort('bestConsistency')" :class="{'active': sortKey === 'bestConsistency'}">Le plus régulier dans une partie</strong>
        <strong class="header" @click="changeSort('longestKill')" :class="{'active': sortKey === 'longestKill'}">Le kill le plus lointain dans une partie</strong>
        <strong class="header" @click="changeSort('killstreak')" :class="{'active': sortKey === 'killstreak'}">La meilleure série de kill dans une partie</strong>
        <strong>Forme actuelle sur les 5 derniers matchs</strong>
      </li>
      <li v-for="dataForPlayer in sortedDataForPlayers">
        <router-link :to="'player/' + dataForPlayer.playerRef.guid" tag="strong" class="name">{{dataForPlayer.playerRef.playerName}}</router-link>
        <span>{{dataForPlayer.bestScore}}</span>
        <span>{{dataForPlayer.bestKills}}</span>
        <span>{{dataForPlayer.bestRatio}}</span>
        <span>{{dataForPlayer.bestNades}}</span>
        <span>{{dataForPlayer.bestKnifes}}</span>
        <span>{{dataForPlayer.bestMedic}}</span>
        <span>{{dataForPlayer.bestExtermination}}</span>
        <span>{{dataForPlayer.bestConsistency ? dataForPlayer.bestConsistency.toFixed(1) : "N/A"}}</span>
        <span>{{dataForPlayer.longestKill ? dataForPlayer.longestKill.toFixed(1) : "N/A"}}</span>
        <span>{{dataForPlayer.killstreak ? dataForPlayer.killstreak : "N/A"}}</span>
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
  import {Component, Inject, Vue} from 'vue-property-decorator';
import {mapGetters} from "vuex";
import {orderBy} from "lodash";
import Game from "@/model/Game";
import {GameMood, PlayerGlobalData} from "@/model/Player";
import {format} from "date-fns";
  import {MatchmakingService} from '@/services/MatchmakingService';
  import {DataService} from '@/services/DataService';

@Component({
  computed: {
    ...mapGetters({
      games: "games"
    })
  }
})
export default class Players extends Vue {
  @Inject("dataService") public dataService!: DataService;
  protected games!: Game[];
  private dataForPlayers: PlayerGlobalData[] = [];
  private sortKey: string = "playerRef.playerName";
  private sortKeyDirection: string = "asc";

  public created() {
    this.dataForPlayers = this.dataService.computePlayersPerformance(this.games);
    this.dataForPlayers = orderBy(this.dataForPlayers, ["playerRef.playerName"], ["asc"]);
  }

  public changeSort(key: string) {
    if (this.sortKey === key) {
      this.sortKeyDirection = this.sortKeyDirection === "desc" ? "asc" : "desc";
    } else {
      this.sortKeyDirection = "desc";
    }
    this.sortKey = key;
  }

  get sortedDataForPlayers(): PlayerGlobalData[] {
    // @ts-ignore
    return orderBy(this.dataForPlayers, [this.sortKey], this.sortKeyDirection);
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
    background-color: rgba(0, 0, 0, 0.4);
  }
  .name {
    cursor: pointer;
    color: #36ebff;
  }
  .players > ul > li {
    display: grid;
    grid-template-columns: 150px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 150px;
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
  .header {
    cursor: pointer;
  }
  .header.active {
    color: orange;
  }
    @media (max-width: 1150px) {
    .players {
      padding: 5px;
    }
    .players > ul {
      overflow-x: auto;
      padding-left: 5px;
    }
    .players > ul > li {
      border-bottom: none;
    }
  }
</style>
