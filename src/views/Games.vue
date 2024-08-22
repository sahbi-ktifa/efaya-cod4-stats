<template>
  <div class="games">
    <h3>Season: <strong @click="goToSeason('s20')" :class="{'selected' : seasonKey === 's20'}">2024/2025</strong>
      <strong @click="goToSeason('s19')" :class="{'selected' : seasonKey === 's19'}">2023/2024</strong>
      <strong @click="goToSeason('s18')" :class="{'selected' : seasonKey === 's18'}">2022/2023</strong>
      <strong @click="goToSeason('s17')" :class="{'selected' : seasonKey === 's17'}">2021/2022</strong>
      <strong @click="goToSeason('s16')" :class="{'selected' : seasonKey === 's16'}">2020/2021</strong></h3>

    <div class="top-players" v-if="topRecentPlayers.length > 0">
      <div class="recent">
        <h3>TOP 5 players of the season:</h3>
        <ul>
          <li v-for="player in topSeasonPlayers">
            <span>🏆&nbsp;</span>
            <router-link :to="'player/' + player.ref.guid" tag="strong" class="name">{{player.ref.playerName}}</router-link> - {{player.mean}} EMP
          </li>
        </ul>
      </div>
      <div class="recent">
        <h3>TOP 5 players of the moment:</h3>
        <ul>
          <li v-for="player in topRecentPlayers">
            <span>🏆&nbsp;</span>
            <router-link :to="'player/' + player.ref.guid" tag="strong" class="name">{{player.ref.playerName}}</router-link> - {{player.mean}} EMP
          </li>
        </ul>
      </div>
    </div>

    <h3>Game results:</h3>
    <ul>
      <li v-for="game in games" @click="goToGame(game)">
        <img class="map-preview" :src="game.mapPreview" alt="map-preview">
        <div class="game-summary">
          <h4>{{mapNamer(game.map)}}</h4>
          <h4 class="game-date">{{formatDate(game.date)}}</h4>
          <div class="players-summary">Joueurs : <strong>{{game.players.length}}</strong></div>
          <span class="round-summary">
            Manche 1 : <strong>{{team1Round1(game.gameRefs[0])}}</strong> / <strong>{{team2Round1(game.gameRefs[0])}}</strong><br/>
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
import {PlayerRef} from "@/model/Player";
import {MatchmakingService} from "@/services/MatchmakingService";
import {orderBy} from "lodash";

class TopPlayer {

  public ref!: PlayerRef;
  public participation!: number;
  public mean!: number;
  constructor(playerRef: PlayerRef, mean: number) {
    this.ref = playerRef;
    this.mean = mean;
    this.participation = 1;
  }
}

@Component({
  computed: {
    ...mapGetters({
      games: "games"
    })
  }
})
export default class Games extends Vue {
  @Inject("dataService") public dataService!: DataService;
  @Inject("matchMakingService") public matchMakingService!: MatchmakingService;

  protected games!: Game[];
  private seasonKey: string = "s20";

  get topSeasonPlayers(): TopPlayer[] {
    const players: TopPlayer[] = [];
    const _players: string[] = [];
    this.games.forEach((g) => {
      g.players.forEach((p) => {
        if (_players.indexOf(p.playerRef.guid) === -1) {
          _players.push(p.playerRef.guid);
          players.push(new TopPlayer(p.playerRef, Math.round(this.matchMakingService.computeEMP(p.playerRef.guid, this.games))));
        } else if (_players.indexOf(p.playerRef.guid) >= 0) {
          const _p = players.filter((_p) => _p.ref.guid === p.playerRef.guid)[0];
          _p.participation++;
        }
      });
    });
    return orderBy(players.filter((p) => p.participation > 5), ["mean"], ["desc"]).slice(0, 5);
  }

  get topRecentPlayers(): TopPlayer[] {
    const players: TopPlayer[] = [];
    const _players: string[] = [];
    const games = this.games.slice(0, 5);
    games.forEach((g) => {
      g.players.forEach((p) => {
        if (_players.indexOf(p.playerRef.guid) === -1) {
          _players.push(p.playerRef.guid);
          players.push(new TopPlayer(p.playerRef, Math.round(this.matchMakingService.computeEMP(p.playerRef.guid, games))));
        } else if (_players.indexOf(p.playerRef.guid) >= 0) {
          const _p = players.filter((_p) => _p.ref.guid === p.playerRef.guid)[0];
          _p.participation++;
        }
      });
    });
    return orderBy(players.filter((p) => p.participation > 2), ["mean"], ["desc"]).slice(0, 5);
  }

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
  .name {
    cursor: pointer;
    color: #36ebff;
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
  .top-players {
    display: flex;
    gap: 20px;
  }
</style>
