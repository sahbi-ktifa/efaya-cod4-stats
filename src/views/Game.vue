<template>
  <div class="game">
    <img class="map-preview" :src="game.mapPreview" alt="map-preview">
    <h3>{{mapNamer(game.map)}} - {{formatDate(game.date)}} - {{game.mod}}</h3>
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
        <div>Round1: <strong>{{winnerPoints[0]}}</strong> / Round2: <strong>{{winnerPoints[1]}}</strong> - Total: <strong>{{winnerPoints[0] + winnerPoints[1]}}</strong></div>
        <ul>
          <li v-for="player in winners">
            <router-link :to="'/player/' + player.playerRef.guid" tag="strong" class="name">{{player.playerRef.playerName}}</router-link>
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
        <div>Round1: <strong>{{loserPoints[0]}}</strong> / Round2: <strong>{{loserPoints[1]}}</strong> - Total: <strong>{{loserPoints[0] + loserPoints[1]}}</strong></div>
        <ul>
          <li v-for="player in losers">
            <router-link :to="'/player/' + player.playerRef.guid" tag="strong" class="name">{{player.playerRef.playerName}}</router-link>
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
          <img src="../assets/award/killer.png" class="trophy">
          <strong>The killer</strong><br/>
          <i>{{deadliest.playerRef.playerName}} : {{deadliest.totalKills}}</i>
        </div>
        <div>
          <img src="../assets/award/scorer.png" class="trophy">
          <strong>The scorer</strong><br/>
          <i>{{scorer.playerRef.playerName}} : {{scorer.totalScore}}</i>
        </div>
        <div>
          <img src="../assets/award/bankable.png" class="trophy">
          <strong>The most bankable</strong><br/>
          <i>{{bankable.playerRef.playerName}} : {{bankable.globalRatio}}</i>
        </div>
        <div>
          <img src="../assets/award/death.png" class="trophy">
          <strong>The most targeted</strong><br/>
          <i>{{targeted.playerRef.playerName}} : {{targeted.totalDeaths}}</i>
        </div>
        <div>
          <img src="../assets/award/ghost.png" class="trophy">
          <strong>The less killed</strong><br/>
          <i>{{unkillable.playerRef.playerName}} : {{unkillable.totalDeaths}}</i>
        </div>
        <div>
          <img src="../assets/award/bomber.png" class="trophy">
          <strong>The bomber</strong><br/>
          <i>{{bomber.playerRef.playerName}} : {{bomber.bombsPlanted}}</i>
        </div>
        <div>
          <img src="../assets/award/defuser.png" class="trophy">
          <strong>The defuser</strong><br/>
          <i>{{defuser.playerRef.playerName}} : {{defuser.bombsDefused}}</i>
        </div>
        <div>
          <img src="../assets/award/exterminator.png" class="trophy">
          <strong>Exterminator</strong><br/>
          <i>{{exterminator.playerRef.playerName}} : {{exterminator.killsConfirmed}}</i>
        </div>
        <div>
          <img src="../assets/award/medic.png" class="trophy">
          <strong>The Medic</strong><br/>
          <i>{{medic.playerRef.playerName}} : {{medic.killsDenied}}</i>
        </div>
        <div>
          <img src="../assets/award/rifler.png" class="trophy">
          <strong>Rifle Master</strong><br/>
          <i>{{rifleKiller.playerRef.playerName}} : {{rifleKiller.rifleKills}}</i>
        </div>
        <div>
          <img src="../assets/award/smg.png" class="trophy">
          <strong>SMG Master</strong><br/>
          <i>{{smgKiller.playerRef.playerName}} : {{smgKiller.smgKills}}</i>
        </div>
        <div>
          <img src="../assets/award/sniper.png" class="trophy">
          <strong>Sniper Master</strong><br/>
          <i>{{sniperKiller.playerRef.playerName}} : {{sniperKiller.sniperKills}}</i>
        </div>
        <div>
          <img src="../assets/award/shotgun.png" class="trophy">
          <strong>Shotgun Master</strong><br/>
          <i>{{shotgunKiller.playerRef.playerName}} : {{shotgunKiller.shotgunKills}}</i>
        </div>
        <div>
          <img src="../assets/award/grenade.png" class="trophy">
          <strong>Grenade Master</strong><br/>
          <i>{{nadeKiller.playerRef.playerName}} : {{nadeKiller.grenadeKills}}</i>
        </div>
        <div>
          <img src="../assets/award/knife.png" class="trophy">
          <strong>Knife Master</strong><br/>
          <i>{{knifeKiller.playerRef.playerName}} : {{knifeKiller.meleeKills}}</i>
        </div>
        <div>
          <img src="../assets/award/pistol.png" class="trophy">
          <strong>Pistol Master</strong><br/>
          <i>{{pistolKiller.playerRef.playerName}} : {{pistolKiller.pistolKills}}</i>
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
  public winnerPoints: number[] = [];
  public loserPoints: number[] = [];
  protected games!: Game[];

  public created() {
    // @ts-ignore
    this.game = this.games.filter((game) => game.map === this.$route.params.map)[0];
    const team1 = this.game.gameRefs[0].alliesScore + this.game.gameRefs[1].axisScore;
    const team2 = this.game.gameRefs[0].axisScore + this.game.gameRefs[1].alliesScore;
    let winnersGuid: string[] = [];
    let losersGuid: string[] = [];
    if (team1 > team2) {
      this.winnerPoints[0] = this.game.gameRefs[0].alliesScore;
      this.winnerPoints[1] = this.game.gameRefs[1].axisScore;
      this.loserPoints[0] = this.game.gameRefs[0].axisScore;
      this.loserPoints[1] = this.game.gameRefs[1].alliesScore;
      const winners = this.game.gameRefs[0].players.filter((p) => p.team === "allies").map((p) => p.playerRef.guid);
      winners.concat(this.game.gameRefs[1].players.filter((p) => p.team === "axis").map((p) => p.playerRef.guid));
      winnersGuid = Array.from(new Set(winners));
      const losers = this.game.gameRefs[0].players.filter((p) => p.team === "axis").map((p) => p.playerRef.guid);
      losers.concat(this.game.gameRefs[1].players.filter((p) => p.team === "allies").map((p) => p.playerRef.guid));
      losersGuid = Array.from(new Set(losers));
    } else {
      this.winnerPoints[0] = this.game.gameRefs[0].axisScore;
      this.winnerPoints[1] = this.game.gameRefs[1].alliesScore;
      this.loserPoints[0] = this.game.gameRefs[0].alliesScore;
      this.loserPoints[1] = this.game.gameRefs[1].axisScore;
      const winners = this.game.gameRefs[0].players.filter((p) => p.team === "axis").map((p) => p.playerRef.guid);
      winners.concat(this.game.gameRefs[1].players.filter((p) => p.team === "allies").map((p) => p.playerRef.guid));
      winnersGuid = Array.from(new Set(winners));
      const losers = this.game.gameRefs[0].players.filter((p) => p.team === "allies").map((p) => p.playerRef.guid);
      losers.concat(this.game.gameRefs[1].players.filter((p) => p.team === "axis").map((p) => p.playerRef.guid));
      losersGuid = Array.from(new Set(losers));
    }
    this.winners = this.game.players.filter((p) => winnersGuid.indexOf(p.playerRef.guid) > -1);
    this.losers = this.game.players.filter((p) => losersGuid.indexOf(p.playerRef.guid) > -1);
  }

  get bankable() {
    return this.retrieveValue("globalRatio");
  }

  get deadliest() {
    return this.retrieveValue("totalKills");
  }

  get unkillable() {
    return orderBy(this.game.players, ["totalDeaths"], ["asc"])[0];
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

  get pistolKiller() {
    return this.retrieveValue("pistolKills");
  }

  public formatDate(date: Date): string {
    return format(date, "dd/MM/yyyy");
  }

  private retrieveValue(ref: string) {
    return orderBy(this.game.players, [ref], ["desc"])[0];
  }

  public mapNamer(mapName: string): string {
    return mapName.replace("mp_", "").replace(/_/g, " ").toUpperCase();
  }
}
</script>

<style scoped>
  .game {
    margin-top: 15px;
  }
  .game .map-preview {
    height: 250px;
  }
  .game > ul {
    text-align: left;
    background-color: rgba(0, 0, 0, 0.4);
    margin-bottom: 0;
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
  .trophies-container {
    background-color: rgba(0, 0, 0, 0.4);
    padding-top: 25px;
    padding-bottom: 30px;
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
  .name {
    cursor: pointer;
    color: #36ebff;
  }
</style>
