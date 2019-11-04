<template>
  <div class="game">
    <img class="map-preview" :src="game.mapPreview" alt="map-preview">
    <h3>{{game.map}} - {{formatDate(game.date)}} - {{game.mod}}</h3>
    <ul>
      <li>
        <ul>
          <li>
            <span></span>
            <strong>Scores</strong>
            <strong>Kills</strong>
            <strong>Deaths</strong>
            <strong>Ratio</strong>
            <strong>Total Score</strong>
            <strong>Total Kills</strong>
            <strong>Total Deaths</strong>
            <strong>Global Ratio</strong>
            <strong>Bomb Planted / Defused</strong>
            <strong>Kill confirmed</strong>
            <strong>Teammate rescued</strong>
          </li>
        </ul>
      </li>
      <li>
        <h4>Winning Team!</h4>
        <ul>
          <li v-for="player in winners">
            <span>{{player.playerRef.playerName}}</span>
            <span>{{player.score[0]}}<br/>{{player.score[1]}}</span>
            <span>{{player.kills[0]}}<br/>{{player.kills[1]}}</span>
            <span>{{player.deaths[0]}}<br/>{{player.deaths[1]}}</span>
            <span>{{player.ratio[0]}}<br/>{{player.ratio[1]}}</span>
            <span>{{player.totalScore}}</span>
            <span>{{player.totalKills}}</span>
            <span>{{player.totalDeaths}}</span>
            <span>{{player.globalRatio}}</span>
            <span>{{player.bombsPlanted}}<br/>{{player.bombsDefused}}</span>
            <span>{{player.killsConfirmed}}</span>
            <span>{{player.killsDenied}}</span>
          </li>
        </ul>
      </li>
      <li>
        <h4>Loosing Team!</h4>
        <ul>
          <li v-for="player in losers">
            <span>{{player.playerRef.playerName}}</span>
            <span>{{player.score[0]}}<br/>{{player.score[1]}}</span>
            <span>{{player.kills[0]}}<br/>{{player.kills[1]}}</span>
            <span>{{player.deaths[0]}}<br/>{{player.deaths[1]}}</span>
            <span>{{player.ratio[0]}}<br/>{{player.ratio[1]}}</span>
            <span>{{player.totalScore}}</span>
            <span>{{player.totalKills}}</span>
            <span>{{player.totalDeaths}}</span>
            <span>{{player.globalRatio}}</span>
            <span>{{player.bombsPlanted}}<br/>{{player.bombsDefused}}</span>
            <span>{{player.killsConfirmed}}</span>
            <span>{{player.killsDenied}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="trophies-container">
      <div class="trophies">
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>The killer</strong><br/>
          <i>{{deadliest.playerRef.playerName}} : {{deadliest.totalKills}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>The scorer</strong><br/>
          <i>{{scorer.playerRef.playerName}} : {{scorer.totalScore}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>The most bankable</strong><br/>
          <i>{{bankable.playerRef.playerName}} : {{bankable.globalRatio}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>The most targeted</strong><br/>
          <i>{{targeted.playerRef.playerName}} : {{targeted.totalDeaths}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>The bomber</strong><br/>
          <i>{{bomber.playerRef.playerName}} : {{bomber.bombsPlanted}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>The defuser</strong><br/>
          <i>{{defuser.playerRef.playerName}} : {{defuser.bombsDefused}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>Exterminator</strong><br/>
          <i>{{exterminator.playerRef.playerName}} : {{exterminator.killsConfirmed}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>The Medic</strong><br/>
          <i>{{medic.playerRef.playerName}} : {{medic.killsDenied}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>Rifle Master</strong><br/>
          <i>{{rifleKiller.playerRef.playerName}} : {{rifleKiller.rifleKills}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>SMG Master</strong><br/>
          <i>{{smgKiller.playerRef.playerName}} : {{smgKiller.smgKills}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>Sniper Master</strong><br/>
          <i>{{sniperKiller.playerRef.playerName}} : {{sniperKiller.sniperKills}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>Shotgun Master</strong><br/>
          <i>{{shotgunKiller.playerRef.playerName}} : {{shotgunKiller.shotgunKills}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>Grenade Master</strong><br/>
          <i>{{nadeKiller.playerRef.playerName}} : {{nadeKiller.grenadeKills}}</i>
        </div>
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>Knife Master</strong><br/>
          <i>{{knifeKiller.playerRef.playerName}} : {{knifeKiller.meleeKills}}</i>
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
import { format } from "date-fns";

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
    let maxScore = 0;
    this.game.players.forEach((p) => {
      if (p.totalPoints > maxScore) {
        maxScore = p.totalPoints;
      }
    });
    this.winners = this.game.players.filter((p) => p.totalPoints === maxScore);
    this.losers = this.game.players.filter((p) => p.totalPoints < maxScore);
  }

  get bankable() {
    return this.retrieveValue("globalRatio");
  }

  get deadliest() {
    return this.retrieveValue("totalKills");
  }

  get scorer() {
    return this.retrieveValue("totalScore");
  }

  get targeted() {
    return this.retrieveValue("totalDeaths");
  }

  get bomber() {
    return this.retrieveValue("bombsPlanted");
  }

  get defuser() {
    return this.retrieveValue("bombsDefused");
  }

  get exterminator() {
    return this.retrieveValue("killsConfirmed");
  }

  get medic() {
    return this.retrieveValue("killsDenied");
  }

  get rifleKiller() {
    return this.retrieveValue("rifleKills");
  }

  get smgKiller() {
    return this.retrieveValue("smgKills");
  }

  get sniperKiller() {
    return this.retrieveValue("sniperKills");
  }

  get shotgunKiller() {
    return this.retrieveValue("shotgunKills");
  }

  get knifeKiller() {
    return this.retrieveValue("meleeKills");
  }

  get nadeKiller() {
    return this.retrieveValue("grenadeKills");
  }

  public formatDate(date: Date): string {
    return format(date, "dd/MM/yyyy");
  }

  private retrieveValue(ref: string) {
    return orderBy(this.game.players, [ref], ["desc"])[0];
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
    grid-template-columns: 130px repeat(11, 85px);
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
