<template>
  <div class="game">
    <img class="map-preview" :src="game.mapPreview" alt="map-preview">
    <h3>{{game.map}} on {{game.date}}</h3>
    <ul>
      <li>
        <ul>
          <li>
            <span></span>
            <strong>Scores</strong>
            <strong>Kills</strong>
            <strong>Assists</strong>
            <strong>Deaths</strong>
            <strong>Ratio</strong>
            <strong>Total Score</strong>
            <strong>Total Kills</strong>
            <strong>Total Assists</strong>
            <strong>Total Deaths</strong>
            <strong>Global Ratio</strong>
          </li>
        </ul>
      </li>
      <li>
        <h4>Winning Team!</h4>
        <ul>
          <li v-for="player in winners">
            <span>{{player.playerName}}</span>
            <span>{{player.score[0]}}<br/>{{player.score[1]}}</span>
            <span>{{player.kills[0]}}<br/>{{player.kills[1]}}</span>
            <span>{{player.assists[0]}}<br/>{{player.assists[1]}}</span>
            <span>{{player.deaths[0]}}<br/>{{player.deaths[1]}}</span>
            <span>{{player.ratio[0]}}<br/>{{player.ratio[1]}}</span>
            <span>{{player.totalScore}}</span>
            <span>{{player.totalKills}}</span>
            <span>{{player.totalAssists}}</span>
            <span>{{player.totalDeaths}}</span>
            <span>{{player.globalRatio}}</span>
          </li>
        </ul>
      </li>
      <li>
        <h4>Loosing Team!</h4>
        <ul>
          <li v-for="player in losers">
            <span>{{player.playerName}}</span>
            <span>{{player.score[0]}}<br/>{{player.score[1]}}</span>
            <span>{{player.kills[0]}}<br/>{{player.kills[1]}}</span>
            <span>{{player.assists[0]}}<br/>{{player.assists[1]}}</span>
            <span>{{player.deaths[0]}}<br/>{{player.deaths[1]}}</span>
            <span>{{player.ratio[0]}}<br/>{{player.ratio[1]}}</span>
            <span>{{player.totalScore}}</span>
            <span>{{player.totalKills}}</span>
            <span>{{player.totalAssists}}</span>
            <span>{{player.totalDeaths}}</span>
            <span>{{player.globalRatio}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="trophies-container">
      <div class="trophies">
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>The killer</strong><br/>
          <i>{{deadliest}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>The scorer</strong><br/>
          <i>{{scorer}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>The most bankable</strong><br/>
          <i>{{bankable}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>The most targeted</strong><br/>
          <i>{{targeted}}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {mapGetters} from "vuex";
  import {orderBy} from "lodash";
  import Game from "@/model/Game";
  import {Player} from "@/model/Player";

  @Component({
    computed: {
      ...mapGetters({
        games: "games"
      })
    }
  })
  export default class GameDetails extends Vue {
    public game!: Game;
    public winners!: Player[];
    public losers!: Player[];
    protected games!: Game[];

    public created() {
      // @ts-ignore
      this.game = this.games.filter((game) => game.map === this.$route.params.map)[0];
      this.winners = this.game.players.filter((p) => p.totalPoints === 20);
      this.losers = this.game.players.filter((p) => p.totalPoints < 20);
    }

    get bankable() {
      return orderBy(this.game.players, ["globalRatio"], ["desc"])[0].playerName;
    }

    get deadliest() {
      return orderBy(this.game.players, ["totalKills"], ["desc"])[0].playerName;
    }

    get scorer() {
      return orderBy(this.game.players, ["totalScore"], ["desc"])[0].playerName;
    }

    get targeted() {
      return orderBy(this.game.players, ["totalDeaths"], ["desc"])[0].playerName;
    }
  }
</script>

<style scoped>
  .game .map-preview {
    height: 250px;
  }
  .game > ul {
    text-align: left;
  }
  .game > ul > li {
    display: grid;
  }
  .game > ul > li > ul > li {
    display: grid;
    grid-template-columns: 100px repeat(10, 85px);
    grid-gap: 0 10px;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid lightgray;
  }
  .trophies {
    display: grid;
    grid-template-columns: repeat(4, 200px);
    grid-gap: 0 10px;
    justify-content: center;
    align-items: center;
  }
  .trophies .trophy {
    width: 150px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
