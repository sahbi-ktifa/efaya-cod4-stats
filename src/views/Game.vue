<template>
  <div class="game" v-if="game">
    <div class="game-media">
      <img class="map-preview" :src="game.mapPreview" alt="map-preview">
      <div class="game-media-yt" v-for="video in game.youtubeUrls">
        <iframe width="420" height="315"
                :src="video.replace('/watch?v=', '/embed/')">
        </iframe>
      </div>
    </div>
    <div class="game-media-twitch">
      <div v-for="video in game.twitchClips">
        <iframe
            :src="'https://clips.twitch.tv/embed?clip=' + video + '&parent=iclan-cod4-stats.netlify.app'"
            width="420" height="315">
        </iframe>
      </div>
    </div>
    <h3>{{mapNamer(game.map)}} - {{formatDate(game.date)}}
      - Manche 1 : <strong>{{durationRound1}}</strong>
      - Manche 2 : <strong>{{durationRound2}}</strong>
      - Durée totale : <strong>{{durationGame}}</strong>
      - <img class="mod-logo" alt="Mod logo" src="../assets/efaya_mod.png" v-if="isEfayaMod(game)">
      <img class="mod-logo" alt="Mod logo" src="../assets/efaya_v2.png" v-if="isEfayaModV2(game)">
      <img class="mod-logo" alt="Mod logo" src="../assets/imm.png" v-if="isIMMMod(game)">
      <img class="mod-logo" alt="Mod logo" src="../assets/promod.jpg" v-if="isPromod(game)">
      <img class="mod-logo" alt="Mod logo" src="../assets/ww2.png" v-if="isWW2Mod(game)"></h3>
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
            <span>{{player.assists[0]}}<br/>{{player.assists[1]}}</span>
            <span>{{player.deaths[0]}}<br/>{{player.deaths[1]}}</span>
            <span>{{player.ratio[0]}}<br/>{{player.ratio[1]}}</span>
            <span>{{player.totalScore}}</span>
            <span>{{player.totalKills}}</span>
            <span>{{player.totalAssists}}</span>
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
            <span>{{player.assists[0]}}<br/>{{player.assists[1]}}</span>
            <span>{{player.deaths[0]}}<br/>{{player.deaths[1]}}</span>
            <span>{{player.ratio[0]}}<br/>{{player.ratio[1]}}</span>
            <span>{{player.totalScore}}</span>
            <span>{{player.totalKills}}</span>
            <span>{{player.totalAssists}}</span>
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
          <strong>Celui sur qui parier (meilleur ratio)</strong><br/>
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
          <img src="../assets/award/assistant.png" class="trophy">
          <strong>Celui qui aide le plus</strong><br/>
          <i>{{assistant.playerRef.playerName}} : A aidé sur {{assistant.totalAssists}} éliminations</i>
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
        <div v-if="exterminator.killsConfirmed > 0">
          <img src="../assets/award/exterminator.png" class="trophy">
          <strong>Chasseur de tags</strong><br/>
          <i>{{exterminator.playerRef.playerName}} : {{exterminator.killsConfirmed}} tag(s)</i>
        </div>
        <div v-if="medic.killsDenied > 0">
          <img src="../assets/award/medic.png" class="trophy">
          <strong>Le médic</strong><br/>
          <i>{{medic.playerRef.playerName}} : {{medic.killsDenied}} réanimation(s)</i>
        </div>
        <div v-if="teamKiller.teamKills > 0">
          <img src="../assets/award/teamkiller.png" class="trophy">
          <strong>Le mec qui joue en fait pour l'autre équipe</strong><br/>
          <i>{{teamKiller.playerRef.playerName}} : {{teamKiller.teamKills}} teamkill(s)</i>
        </div>
        <div v-if="teamKilled.teamKilled > 0">
          <img src="../assets/award/teamkiller.png" class="trophy">
          <strong>Le mec trahi par sa propre équipe</strong><br/>
          <i>{{teamKilled.playerRef.playerName}} : {{teamKilled.teamKilled}} teamkillé(s)</i>
        </div>
        <div v-if="rifleKiller.rifleKills > 0">
          <img src="../assets/award/rifler.png" class="trophy">
          <strong>Maître des fusils d'assaut</strong><br/>
          <i>{{rifleKiller.playerRef.playerName}} : {{rifleKiller.rifleKills}} kills</i>
        </div>
        <div v-if="smgKiller.smgKills > 0">
          <img src="../assets/award/smg.png" class="trophy">
          <strong>Maître des SMG</strong><br/>
          <i>{{smgKiller.playerRef.playerName}} : {{smgKiller.smgKills}} kills</i>
        </div>
        <div v-if="sniperKiller.sniperKills > 0">
          <img src="../assets/award/sniper.png" class="trophy">
          <strong>Maître des Sniper</strong><br/>
          <i>{{sniperKiller.playerRef.playerName}} : {{sniperKiller.sniperKills}} kills</i>
        </div>
        <div v-if="shotgunKiller.shotgunKills > 0">
          <img src="../assets/award/shotgun.png" class="trophy">
          <strong>Maître du pompe</strong><br/>
          <i>{{shotgunKiller.playerRef.playerName}} : {{shotgunKiller.shotgunKills}} kills</i>
        </div>
        <div v-if="nadeKiller.grenadeKills > 0">
          <img src="../assets/award/grenade.png" class="trophy">
          <strong>Maître des Grenades</strong><br/>
          <i>{{nadeKiller.playerRef.playerName}} : {{nadeKiller.grenadeKills}} kills</i>
        </div>
        <div v-if="knifeKiller.meleeKills > 0">
          <img src="../assets/award/knife.png" class="trophy">
          <strong>Maître du couteau</strong><br/>
          <i>{{knifeKiller.playerRef.playerName}} : {{knifeKiller.meleeKills}} kills</i>
        </div>
        <div v-if="pistolKiller.pistolKills > 0">
          <img src="../assets/award/pistol.png" class="trophy">
          <strong>Maître du pistolet</strong><br/>
          <i>{{pistolKiller.playerRef.playerName}} : {{pistolKiller.pistolKills}} kills</i>
        </div>
        <div v-if="accuracy.accuracy > 0">
          <img src="../assets/award/accuracy.png" class="trophy">
          <strong>Le mec le plus précis sur une manche</strong><br/>
          <i>{{accuracy.playerRef.playerName}} : {{accuracy.accuracy}} %</i>
        </div>
        <div v-if="killstreak.killstreak > 0">
          <img src="../assets/award/killstreak.png" class="trophy">
          <strong>La plus longue série de kill</strong><br/>
          <i>{{killstreak.playerRef.playerName}} : {{killstreak.killstreak}} kills d'affilés</i>
        </div>
        <div v-if="deathstreak.deathstreak > 0">
          <img src="../assets/award/deathstreak.png" class="trophy">
          <strong>La plus longue série de morts sans kill</strong><br/>
          <i>{{deathstreak.playerRef.playerName}} : {{deathstreak.deathstreak}} morts d'affilées</i>
        </div>
        <div v-if="longestKill.longestKill > 0">
          <img src="../assets/award/longestKill.png" class="trophy">
          <strong>Le kill le plus lointain</strong><br/>
          <i>{{longestKill.playerRef.playerName}} : {{longestKill.longestKill}} mètre(s)</i>
        </div>
        <div v-if="longestHS.longestHS > 0">
          <img src="../assets/award/longestHS.png" class="trophy">
          <strong>Le headshot le plus lointain</strong><br/>
          <i>{{longestHS.playerRef.playerName}} : {{longestHS.longestHS}} mètre(s)</i>
        </div>
        <div v-if="distance.distance > 0">
          <img src="../assets/award/distance.png" class="trophy">
          <strong>Le gars qui court beaucoup</strong><br/>
          <i>{{distance.playerRef.playerName}} : {{distance.distance}} mètre(s)</i>
        </div>
        <div v-if="camper.distance > 0">
          <img src="../assets/award/camper.png" class="trophy">
          <strong>Le mec un peu fainéant</strong><br/>
          <i>{{camper.playerRef.playerName}} : {{camper.distance}} mètre(s)</i>
        </div>
        <div v-if="crazyShooter.totalShots > 0">
          <img src="../assets/award/maxshots.png" class="trophy">
          <strong>Le gars qui tire vraiment partout</strong><br/>
          <i>{{crazyShooter.playerRef.playerName}} : {{crazyShooter.totalShots}} tir(s)</i>
        </div>
        <div v-if="everyBulletCounts.totalShots > 0">
          <img src="../assets/award/minusshot.png" class="trophy">
          <strong>Le gars qui économise ses balles</strong><br/>
          <i>{{everyBulletCounts.playerRef.playerName}} : {{everyBulletCounts.totalShots}} tir(s)</i>
        </div>
        <div v-if="collateral.collateralKills > 0">
          <img src="../assets/award/collateral.png" class="trophy">
          <strong>Le gars qui utilise l'environnement</strong><br/>
          <i>{{collateral.playerRef.playerName}} : {{collateral.collateralKills}} kill(s)</i>
        </div>
        <div v-if="quickestKill">
          <img src="../assets/award/quickestkill.png" class="trophy">
          <strong>Le gars qui a dégainé le plus vite</strong><br/>
          <i>{{quickestKill.playerRef.playerName}} : {{duration(quickestKill.quickestKill)}}</i>
        </div>
        <div v-if="quickestDeath">
          <img src="../assets/award/quickestdeath.png" class="trophy">
          <strong>Le gars qui a pris une balle très tôt</strong><br/>
          <i>{{quickestDeath.playerRef.playerName}} : {{duration(quickestDeath.quickestDeath)}}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {orderBy} from "lodash";
import Game from "@/model/Game";
import {Player} from "@/model/Player";
import { format } from "date-fns";
import {GameService} from "@/services/GameService";
import TimeUtils from "@/services/TimeUtils";

@Component({
  computed: {
    ...mapGetters({
      games: "games",
      gameResults: "championshipGames",
      scrims: "scrims"
    })
  }
})
export default class GameDetails extends Vue {

  get durationRound1() {
    if (this.game && this.game.gameRefs[0].endTime) {
      return TimeUtils.getReadableDiffTime(this.game.gameRefs[0].endTime - this.game.gameRefs[0].startTime);
    }
  }

  get durationRound2() {
    if (this.game && this.game.gameRefs[1].endTime) {
      return TimeUtils.getReadableDiffTime(this.game.gameRefs[1].endTime - this.game.gameRefs[1].startTime);
    }
  }

  get durationGame() {
    if (this.game && this.game.gameRefs[0].endTime) {
      const duration = (this.game.gameRefs[0].endTime - this.game.gameRefs[0].startTime) + (this.game.gameRefs[1].endTime - this.game.gameRefs[1].startTime);
      return TimeUtils.getReadableDiffTime(duration);
    }
  }

  get bankable() {
    return this.retrieveValue("globalRatio");
  }

  get deadliest() {
    return this.retrieveValue("totalKills");
  }

  get assistant() {
    return this.retrieveValue("totalAssists");
  }

  get unkillable() {
    if (this.game) {
      return orderBy(this.playersWithoutSpectators, ["totalDeaths"], ["asc"])[0];
    }
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

  get teamKilled() {
    return this.retrieveValue("teamKilled");
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
    if (this.game) {
      return orderBy(this.playersWithoutSpectators, ["consistency"], ["asc"])[0];
    }
  }

  get inconsistency() {
    if (this.game) {
      return orderBy(this.playersWithoutSpectators, ["consistency"], ["desc"])[0];
    }
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
    if (this.game) {
      return orderBy(this.playersWithoutSpectators, ["distance"], ["asc"])[0];
    }
  }

  get quickestDeath() {
    if (this.game) {
      return orderBy(this.playersWithoutSpectators, ["quickestDeath"], ["asc"])[0];
    }
  }

  get quickestKill() {
    if (this.game) {
      return orderBy(this.playersWithoutSpectators, ["quickestKill"], ["asc"])[0];
    }
  }

  get crazyShooter() {
    return this.retrieveValue("totalShots");
  }

  get everyBulletCounts() {
    if (this.game) {
      return orderBy(this.playersWithoutSpectators, ["totalShots"], ["asc"])[0];
    }
  }

  get collateral() {
    return this.retrieveValue("collateralKills");
  }

  public game: Game | null = null;
  public winners: Player[] = [];
  public losers: Player[] = [];
  public winnerPoints: number[] = [];
  public loserPoints: number[] = [];
  protected games!: Game[];
  protected gameResults!: Game[];
  protected scrims!: Game[];

  public created() {
    this.loadData();
  }

  get playersWithoutSpectators(): Player[] {
    if (!this.game) {
      return [];
    }
    return this.game.players.filter((p) => p.totalDeaths > 0);
  }

  @Watch("games")
  public loadData() {
    if (this.$route.params.map.indexOf("championship") === 0) {
      const matchId = this.$route.params.map.replace("championship", "");
      this.game = this.gameResults.filter((game) => game.id === matchId)[0];
    } else if (this.$route.params.map.indexOf("scrims") === 0) {
      const matchId = this.$route.params.map.replace("scrims", "");
      this.game = this.scrims.filter((game) => game.id === matchId)[0];
    } else {
      this.game = this.games.filter((game) => game.map === this.$route.params.map)[0];
    }
    if (this.game) {
      const [winnersGuid, losersGuid, winnerPoints, loserPoints] = new GameService().computeWinnersLosers(this.game);
      this.winnerPoints = winnerPoints;
      this.loserPoints = loserPoints;
      this.winners = this.playersWithoutSpectators.filter((p) => winnersGuid.indexOf(p.playerRef.guid) > -1);
      this.losers = this.playersWithoutSpectators.filter((p) => losersGuid.indexOf(p.playerRef.guid) > -1);
    }
  }

  public duration(time: number): string {
    return TimeUtils.getReadableDiffTime(time);
  }

  public formatDate(date: Date): string {
    return !isNaN(date.getDate()) ? format(date, "dd/MM/yyyy") : "";
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

  public isPromod(game: Game) {
    return game.mod.startsWith("pml");
  }

  private retrieveValue(ref: string) {
    if (this.game) {
      return orderBy(this.playersWithoutSpectators, [ref], ["desc"])[0];
    }
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
    grid-template-columns: 130px repeat(14, 75px);
    grid-gap: 0 10px;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid lightgray;
  }
  .game-media {
    display: flex;
    justify-content: center;
  }
  .game-media-yt {
    margin-left: 20px;
  }
  .game-media-twitch {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-gap: 20px;
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
    .game-media, .game-media-twitch {
      display: block;
    }
    .game-media-twitch iframe, .game-media-yt iframe {
      width: 320px;
    }
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
