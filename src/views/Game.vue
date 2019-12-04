<template>
  <div class="game">
    <img class="map-preview" :src="game.mapPreview" alt="map-preview">
    <h3>{{mapNamer(game.map)}} - {{formatDate(game.date)}} - <img class="mod-logo" alt="Mod logo" src="../assets/efaya_mod.png" v-if="isEfayaMod(game)">
      <img class="mod-logo" alt="Mod logo" src="../assets/efaya_v2.png" v-if="isEfayaModV2(game)">
      <img class="mod-logo" alt="Mod logo" src="../assets/imm.png" v-if="isIMMMod(game)">
      <img class="mod-logo" alt="Mod logo" src="../assets/ww2.png" v-if="isWW2Mod(game)"></h3>
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
            <strong>Kill confirmés</strong>
            <strong>Equipiers ranimés</strong>
            <strong>Régularité*</strong>
          </li>
        </ul>
      </li>
      <li>
        <h4>Les heureux Vainqueurs!</h4>
        <div>Manche 1 : <strong>{{winnerPoints[0]}}</strong> / Manche 2 : <strong>{{winnerPoints[1]}}</strong> - Total : <strong>{{winnerPoints[0] + winnerPoints[1]}}</strong></div>
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
            <span>{{player.consistency ? player.consistency.toFixed(1) : "N/A"}}</span>
          </li>
        </ul>
      </li>
      <li>
        <h4>Les malheureux perdants!</h4>
        <div>Manche 1 : <strong>{{loserPoints[0]}}</strong> / Manche 2 : <strong>{{loserPoints[1]}}</strong> - Total: <strong>{{loserPoints[0] + loserPoints[1]}}</strong></div>
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
            <span>{{player.consistency ? player.consistency.toFixed(1) : "N/A"}}</span>
          </li>
        </ul>
      </li>
      <li>
        <i>Régularité * : Plus la régularité est basse, plus on est régulier</i>
      </li>
    </ul>
    <div class="trophies-container">
      <div class="trophies">
        <div>
          <img src="../assets/award/killer.png" class="trophy">
          <strong>Le tueur</strong><br/>
          <i>{{deadliest.playerRef.playerName}} : {{deadliest.totalKills}} kills</i>
        </div>
        <div>
          <img src="../assets/award/scorer.png" class="trophy">
          <strong>Le scorer</strong><br/>
          <i>{{scorer.playerRef.playerName}} : {{scorer.totalScore}} pts</i>
        </div>
        <div>
          <img src="../assets/award/bankable.png" class="trophy">
          <strong>Celui sur qui parié (meilleur ratio)</strong><br/>
          <i>{{bankable.playerRef.playerName}} : {{bankable.globalRatio}}</i>
        </div>
        <div>
          <img src="../assets/award/death.png" class="trophy">
          <strong>Le plus pris pour cible</strong><br/>
          <i>{{targeted.playerRef.playerName}} : mort {{targeted.totalDeaths}} fois</i>
        </div>
        <div>
          <img src="../assets/award/ghost.png" class="trophy">
          <strong>Le mec qui évite les balles</strong><br/>
          <i>{{unkillable.playerRef.playerName}} : mort {{unkillable.totalDeaths}} fois</i>
        </div>
        <div>
          <img src="../assets/award/consistency.png" class="trophy">
          <strong>Le joueur super régulier</strong><br/>
          <i>{{consistency.playerRef.playerName}} : {{consistency.consistency ? consistency.consistency.toFixed(1) : "N/A"}}</i>
        </div>
        <div>
          <img src="../assets/award/inconsistency.png" class="trophy">
          <strong>Le foufou pas du tout régulier</strong><br/>
          <i>{{inconsistency.playerRef.playerName}} : {{inconsistency.consistency ? inconsistency.consistency.toFixed(1) : "N/A"}}</i>
        </div>
        <div>
          <img src="../assets/award/bomber.png" class="trophy">
          <strong>Le planteur de bombe</strong><br/>
          <i>{{bomber.playerRef.playerName}} : {{bomber.bombsPlanted}}</i>
        </div>
        <div>
          <img src="../assets/award/defuser.png" class="trophy">
          <strong>Le démineur</strong><br/>
          <i>{{defuser.playerRef.playerName}} : {{defuser.bombsDefused}}</i>
        </div>
        <div>
          <img src="../assets/award/exterminator.png" class="trophy">
          <strong>Chasseur de tags</strong><br/>
          <i>{{exterminator.playerRef.playerName}} : {{exterminator.killsConfirmed}} tag(s)</i>
        </div>
        <div>
          <img src="../assets/award/medic.png" class="trophy">
          <strong>Le médic</strong><br/>
          <i>{{medic.playerRef.playerName}} : {{medic.killsDenied}} réanimation(s)</i>
        </div>
        <div>
          <img src="../assets/award/teamkiller.png" class="trophy">
          <strong>Le mec qui joue en fait pour l'autre équipe</strong><br/>
          <i>{{teamKiller.playerRef.playerName}} : {{teamKiller.teamKills}} teamkill(s)</i>
        </div>
        <div>
          <img src="../assets/award/rifler.png" class="trophy">
          <strong>Maître des fusils d'assaut</strong><br/>
          <i>{{rifleKiller.playerRef.playerName}} : {{rifleKiller.rifleKills}} kills</i>
        </div>
        <div>
          <img src="../assets/award/smg.png" class="trophy">
          <strong>Maître des SMG</strong><br/>
          <i>{{smgKiller.playerRef.playerName}} : {{smgKiller.smgKills}} kills</i>
        </div>
        <div>
          <img src="../assets/award/sniper.png" class="trophy">
          <strong>Maître des Sniper</strong><br/>
          <i>{{sniperKiller.playerRef.playerName}} : {{sniperKiller.sniperKills}} kills</i>
        </div>
        <div>
          <img src="../assets/award/shotgun.png" class="trophy">
          <strong>Maître du pompe</strong><br/>
          <i>{{shotgunKiller.playerRef.playerName}} : {{shotgunKiller.shotgunKills}} kills</i>
        </div>
        <div>
          <img src="../assets/award/grenade.png" class="trophy">
          <strong>Maître des Grenades</strong><br/>
          <i>{{nadeKiller.playerRef.playerName}} : {{nadeKiller.grenadeKills}} kills</i>
        </div>
        <div>
          <img src="../assets/award/knife.png" class="trophy">
          <strong>Maître du couteau</strong><br/>
          <i>{{knifeKiller.playerRef.playerName}} : {{knifeKiller.meleeKills}} kills</i>
        </div>
        <div>
          <img src="../assets/award/pistol.png" class="trophy">
          <strong>Maître du pistolet</strong><br/>
          <i>{{pistolKiller.playerRef.playerName}} : {{pistolKiller.pistolKills}} kills</i>
        </div>
        <div>
          <img src="../assets/award/accuracy.png" class="trophy">
          <strong>Le mec précis</strong><br/>
          <i>{{accuracy.playerRef.playerName}} : {{accuracy.accuracy}} %</i>
        </div>
        <div>
          <img src="../assets/award/killstreak.png" class="trophy">
          <strong>La plus longue série de kill</strong><br/>
          <i>{{killstreak.playerRef.playerName}} : {{killstreak.killstreak}} kills d'affilé</i>
        </div>
        <div>
          <img src="../assets/award/deathstreak.png" class="trophy">
          <strong>La plus longue série de morts sans kill</strong><br/>
          <i>{{deathstreak.playerRef.playerName}} : {{deathstreak.deathstreak}} morts d'affilé</i>
        </div>
        <div>
          <img src="../assets/award/longestKill.png" class="trophy">
          <strong>Le kill le plus lointain</strong><br/>
          <i>{{longestKill.playerRef.playerName}} : {{longestKill.longestKill}} mètre(s)</i>
        </div>
        <div>
          <img src="../assets/award/longestHS.png" class="trophy">
          <strong>Le headshot le plus lointain</strong><br/>
          <i>{{longestHS.playerRef.playerName}} : {{longestHS.longestHS}} mètre(s)</i>
        </div>
        <div>
          <img src="../assets/award/distance.png" class="trophy">
          <strong>Le gars qui court beaucoup</strong><br/>
          <i>{{distance.playerRef.playerName}} : {{distance.distance}} mètre(s)</i>
        </div>
        <div>
          <img src="../assets/award/camper.png" class="trophy">
          <strong>Le mec un peu fainéant</strong><br/>
          <i>{{camper.playerRef.playerName}} : {{camper.distance}} mètre(s)</i>
        </div>
        <div>
          <img src="../assets/award/maxshots.png" class="trophy">
          <strong>Le gars qui tire vraiment partout</strong><br/>
          <i>{{crazyShooter.playerRef.playerName}} : {{crazyShooter.totalShots}} tir(s)</i>
        </div>
        <div>
          <img src="../assets/award/minusshot.png" class="trophy">
          <strong>Le gars qui économise ses balles</strong><br/>
          <i>{{everyBulletCounts.playerRef.playerName}} : {{everyBulletCounts.totalShots}} tir(s)</i>
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

  get teamKiller() {
    return this.retrieveValue("teamKills");
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

  get consistency() {
    return orderBy(this.game.players, ["consistency"], ["asc"])[0];
  }

  get inconsistency() {
    return orderBy(this.game.players, ["consistency"], ["desc"])[0];
  }

  get accuracy() {
    return this.retrieveValue("accuracy");
  }

  get killstreak() {
    return this.retrieveValue("killstreak");
  }

  get deathstreak() {
    return this.retrieveValue("deathstreak");
  }

  get longestKill() {
    return this.retrieveValue("longestKill");
  }

  get longestHS() {
    return this.retrieveValue("longestHS");
  }

  get distance() {
    return this.retrieveValue("distance");
  }

  get camper() {
    return orderBy(this.game.players, ["distance"], ["asc"])[0];
  }

  get crazyShooter() {
    return this.retrieveValue("totalShots");
  }

  get everyBulletCounts() {
    return orderBy(this.game.players, ["totalShots"], ["asc"])[0];
  }

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

  public formatDate(date: Date): string {
    return format(date, "dd/MM/yyyy");
  }

  public mapNamer(mapName: string): string {
    return mapName.replace("mp_", "").replace(/_/g, " ").toUpperCase();
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

  private retrieveValue(ref: string) {
    return orderBy(this.game.players, [ref], ["desc"])[0];
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
    grid-template-columns: 130px repeat(12, 85px);
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
    width: 220px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .name {
    cursor: pointer;
    color: #36ebff;
  }
  .mod-logo {
    width: 65px;
  }
  @media (max-width: 1150px) {
    .game > ul {
      overflow-x: auto;
      padding-left: 5px;
    }
    .game > ul > li > ul {
      padding-left: 10px;
    }
    .trophies-container {
      padding: 5px;
    }
    .trophies {
      grid-template-columns: 50% 50%;
      grid-gap: 0 5px;
    }
    .trophies .trophy {
      width: 180px;
    }
  }
</style>
