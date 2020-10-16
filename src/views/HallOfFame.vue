<template>
  <div class="hall-of-fame">
    <h4>Quelques statistiques générales:</h4>
    <ul>
      <li v-if="winStarter !== ''">L'équipe démarrant en {{winStarterLabel}} à <strong>{{winStarterValue.toFixed(0)}}%</strong> de gagner le match.</li>
      <li v-if="playerMean !== ''">En moyenne, les matchs réunissent {{playerMean}} joueurs !</li>
    </ul>
    <h1>- &nbsp;Les meilleurs des meilleurs</h1>
    <i>Les statistiques qui suivent sont calculés pour le meilleur sur une seule partie.</i>
    <ul>
      <li v-for="(honor, propertyName) in honors">
        <div>
          <img :src="getImgUrl(honor.icon)" class="trophy">
          <strong>{{propertyName}}</strong>
          <i v-if="propertyName !== 'overallKills'"><router-link :to="'/player/' + honor.playerGuid" tag="strong" class="name">{{honor.playerName}}</router-link> {{honor.honorAmount}}</i>
          <i v-if="propertyName === 'overallKills'">{{honor.honorAmount}}</i>
          <div class="honor-description" v-if="honor.description && honor.description.length > 0">{{honor.description}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import Game from "@/model/Game";
import {Honors, Player} from "@/model/Player";
import { orderBy } from "lodash";

@Component({
  computed: {
    ...mapGetters({
      games: "games"
    })
  }
})
export default class HallOfFame extends Vue {
  protected games!: Game[];
  private honors: Honors = new Honors();
  private winStarter: String = "";
  private winStarterValue: number = 0;
  private playerMean: string = "";

  public created() {
    const playerPresence: any = {};
    const consistency: any = {};
    let players = 0;
    orderBy(this.games, ["date"], ["asc"]).forEach((game) => {
      players += game.players.length;
      game.players.forEach((player) => {
        this.honors.overallKills.honorAmount += player.totalKills;
        this.computeKills(player);
        this.computeRatio(player);
        this.computeOthers(player);
        if (!playerPresence[player.playerRef.guid]) {
          playerPresence[player.playerRef.guid] = {value: 1, name: player.playerRef.playerName};
        } else {
          playerPresence[player.playerRef.guid].value++;
        }
        if (player.consistency && !consistency[player.playerRef.guid]) {
          consistency[player.playerRef.guid] = {value: player.consistency, name: player.playerRef.playerName};
        } else if (player.consistency) {
          consistency[player.playerRef.guid].value += player.consistency;
        }
      });
    });
    this.playerMean = (players / this.games.length).toFixed(0);
    this.computeConsistency(consistency, playerPresence);
    this.computeTourist(playerPresence);
    this.computeWinStarter();
  }

  public getImgUrl(icon: string): string {
    return require("../assets/award/" + icon + ".png");
  }


  get winStarterLabel(): string {
    if (this.winStarter === "axis") {
      return "axis (Attaque)";
    } else {
      return "allies (Défense)";
    }
  }

  private computeWinStarter() {
    let alliesWinStarter = 0;
    let axisWinStarter = 0;
    this.games.forEach((game) => {
      if (game.gameRefs[0].alliesScore + game.gameRefs[1].axisScore > game.gameRefs[0].axisScore + game.gameRefs[1].alliesScore) {
        alliesWinStarter++;
      } else if (game.gameRefs[0].alliesScore + game.gameRefs[1].axisScore < game.gameRefs[0].axisScore + game.gameRefs[1].alliesScore) {
        axisWinStarter++;
      }
    });
    if (axisWinStarter > alliesWinStarter) {
      this.winStarter = "axis";
      this.winStarterValue = (axisWinStarter * 100) / this.games.length;
    } else if (axisWinStarter < alliesWinStarter) {
      this.winStarter = "allies";
      this.winStarterValue = (alliesWinStarter * 100) / this.games.length;
    }
  }

  private computeTourist(playerPresence: any) {
    let touristKey = null;
    let touristValue = Number.MAX_SAFE_INTEGER;
    for (const key in playerPresence) {
      if (playerPresence[key].value > this.honors.goodStudent.honorAmount) {
        this.honors.goodStudent.playerName = playerPresence[key].name;
        this.honors.goodStudent.honorAmount = playerPresence[key].value;
      }
      if (playerPresence[key].value <= touristValue) {
        touristValue = playerPresence[key].value;
        touristKey = key;
      }
    }
    if (touristKey) {
      this.honors.tourist.playerName = playerPresence[touristKey].name;
      this.honors.tourist.honorAmount = playerPresence[touristKey].value;
    }
  }

  private computeConsistency(consistency: any, playerPresence: any) {
    const consistent = {value: Infinity, key: "", name: ""};
    const inconsistent = {value: 0, key: "", name: ""};
    for (const key in consistency) {
      consistency[key].total = consistency[key].value / playerPresence[key].value;
      if (consistency[key].total > inconsistent.value && playerPresence[key].value > 4) {
        inconsistent.value = consistency[key].total;
        inconsistent.name = consistency[key].name;
        inconsistent.key = key;
      }
      if (consistency[key].total < consistent.value && playerPresence[key].value > 4) {
        consistent.value = consistency[key].total;
        consistent.name = consistency[key].name;
        consistent.key = key;
      }
    }
    this.honors.consistent.honorAmount = Number(consistent.value.toFixed(1));
    this.honors.consistent.playerGuid = consistent.key;
    this.honors.consistent.playerName = consistent.name;
    this.honors.inconsistent.honorAmount = Number(inconsistent.value.toFixed(1));
    this.honors.inconsistent.playerGuid = inconsistent.key;
    this.honors.inconsistent.playerName = inconsistent.name;
  }

  private computeKills(player: Player) {
    if (this.honors.topKiller.honorAmount < player.totalKills) {
      this.honors.topKiller.playerName = player.playerRef.playerName;
      this.honors.topKiller.playerGuid = player.playerRef.guid;
      this.honors.topKiller.honorAmount = player.totalKills;
    }
    if (this.honors.topKillerForARun.honorAmount < player.kills[0]) {
      this.honors.topKillerForARun.playerName = player.playerRef.playerName;
      this.honors.topKillerForARun.playerGuid = player.playerRef.guid;
      this.honors.topKillerForARun.honorAmount = player.kills[0];
    }
    if (this.honors.topKillerForARun.honorAmount < player.kills[1]) {
      this.honors.topKillerForARun.playerName = player.playerRef.playerName;
      this.honors.topKillerForARun.playerGuid = player.playerRef.guid;
      this.honors.topKillerForARun.honorAmount = player.kills[1];
    }
  }

  private computeOthers(player: Player) {
    if (this.honors.topAssistant.honorAmount < player.totalAssists) {
      this.honors.topAssistant.playerName = player.playerRef.playerName;
      this.honors.topAssistant.playerGuid = player.playerRef.guid;
      this.honors.topAssistant.honorAmount = player.totalAssists;
    }
    if (this.honors.headshotMan.honorAmount < player.headShots) {
      this.honors.headshotMan.playerName = player.playerRef.playerName;
      this.honors.headshotMan.playerGuid = player.playerRef.guid;
      this.honors.headshotMan.honorAmount = player.headShots;
    }
    if (this.honors.bomber.honorAmount < player.bombsPlanted) {
      this.honors.bomber.playerName = player.playerRef.playerName;
      this.honors.bomber.playerGuid = player.playerRef.guid;
      this.honors.bomber.honorAmount = player.bombsPlanted;
    }
    if (this.honors.defuser.honorAmount < player.bombsDefused) {
      this.honors.defuser.playerName = player.playerRef.playerName;
      this.honors.defuser.playerGuid = player.playerRef.guid;
      this.honors.defuser.honorAmount = player.bombsDefused;
    }
    if (this.honors.medicineMan.honorAmount < player.killsDenied) {
      this.honors.medicineMan.playerName = player.playerRef.playerName;
      this.honors.medicineMan.playerGuid = player.playerRef.guid;
      this.honors.medicineMan.honorAmount = player.killsDenied;
    }
    if (this.honors.exterminator.honorAmount < player.killsConfirmed) {
      this.honors.exterminator.playerName = player.playerRef.playerName;
      this.honors.exterminator.playerGuid = player.playerRef.guid;
      this.honors.exterminator.honorAmount = player.killsConfirmed;
    }
    if (this.honors.suicideMan.honorAmount < player.suicides) {
      this.honors.suicideMan.playerName = player.playerRef.playerName;
      this.honors.suicideMan.playerGuid = player.playerRef.guid;
      this.honors.suicideMan.honorAmount = player.suicides;
    }
    if (this.honors.knifeMan.honorAmount < player.meleeKills) {
      this.honors.knifeMan.playerName = player.playerRef.playerName;
      this.honors.knifeMan.playerGuid = player.playerRef.guid;
      this.honors.knifeMan.honorAmount = player.meleeKills;
    }
    if (this.honors.grenadeMan.honorAmount < player.grenadeKills) {
      this.honors.grenadeMan.playerName = player.playerRef.playerName;
      this.honors.grenadeMan.playerGuid = player.playerRef.guid;
      this.honors.grenadeMan.honorAmount = player.grenadeKills;
    }
    if (this.honors.rifleMan.honorAmount < player.rifleKills) {
      this.honors.rifleMan.playerName = player.playerRef.playerName;
      this.honors.rifleMan.playerGuid = player.playerRef.guid;
      this.honors.rifleMan.honorAmount = player.rifleKills;
    }
    if (this.honors.smgMan.honorAmount < player.smgKills) {
      this.honors.smgMan.playerName = player.playerRef.playerName;
      this.honors.smgMan.playerGuid = player.playerRef.guid;
      this.honors.smgMan.honorAmount = player.smgKills;
    }
    if (this.honors.sniperMan.honorAmount < player.sniperKills) {
      this.honors.sniperMan.playerName = player.playerRef.playerName;
      this.honors.sniperMan.playerGuid = player.playerRef.guid;
      this.honors.sniperMan.honorAmount = player.sniperKills;
    }
    if (this.honors.shotgunMan.honorAmount < player.shotgunKills) {
      this.honors.shotgunMan.playerName = player.playerRef.playerName;
      this.honors.shotgunMan.playerGuid = player.playerRef.guid;
      this.honors.shotgunMan.honorAmount = player.shotgunKills;
    }
    if (this.honors.pistolMan.honorAmount < player.pistolKills) {
      this.honors.pistolMan.playerName = player.playerRef.playerName;
      this.honors.pistolMan.playerGuid = player.playerRef.guid;
      this.honors.pistolMan.honorAmount = player.pistolKills;
    }
    if (this.honors.tchattyMan.honorAmount < player.tchatter) {
      this.honors.tchattyMan.playerName = player.playerRef.playerName;
      this.honors.tchattyMan.playerGuid = player.playerRef.guid;
      this.honors.tchattyMan.honorAmount = player.tchatter;
    }
    if (this.honors.teamKiller.honorAmount < player.teamKills) {
      this.honors.teamKiller.playerName = player.playerRef.playerName;
      this.honors.teamKiller.playerGuid = player.playerRef.guid;
      this.honors.teamKiller.honorAmount = player.teamKills;
    }
    if (this.honors.accuracy.honorAmount < player.accuracy) {
      this.honors.accuracy.playerName = player.playerRef.playerName;
      this.honors.accuracy.playerGuid = player.playerRef.guid;
      this.honors.accuracy.honorAmount = player.accuracy;
    }
    if (this.honors.killstreak.honorAmount < player.killstreak) {
      this.honors.killstreak.playerName = player.playerRef.playerName;
      this.honors.killstreak.playerGuid = player.playerRef.guid;
      this.honors.killstreak.honorAmount = player.killstreak;
    }
    if (this.honors.deathstreak.honorAmount < player.deathstreak) {
      this.honors.deathstreak.playerName = player.playerRef.playerName;
      this.honors.deathstreak.playerGuid = player.playerRef.guid;
      this.honors.deathstreak.honorAmount = player.deathstreak;
    }
    if (this.honors.distance.honorAmount < player.distance) {
      this.honors.distance.playerName = player.playerRef.playerName;
      this.honors.distance.playerGuid = player.playerRef.guid;
      this.honors.distance.honorAmount = player.distance;
    }
    if (this.honors.camper.honorAmount > player.distance && player.distance > 0) {
      this.honors.camper.playerName = player.playerRef.playerName;
      this.honors.camper.playerGuid = player.playerRef.guid;
      this.honors.camper.honorAmount = player.distance;
    }
    if (this.honors.longestKill.honorAmount < player.longestKill) {
      this.honors.longestKill.playerName = player.playerRef.playerName;
      this.honors.longestKill.playerGuid = player.playerRef.guid;
      this.honors.longestKill.honorAmount = player.longestKill;
    }
    if (this.honors.longestHS.honorAmount < player.longestHS) {
      this.honors.longestHS.playerName = player.playerRef.playerName;
      this.honors.longestHS.playerGuid = player.playerRef.guid;
      this.honors.longestHS.honorAmount = player.longestHS;
    }
    if (this.honors.crazyShooter.honorAmount < player.totalShots) {
      this.honors.crazyShooter.playerName = player.playerRef.playerName;
      this.honors.crazyShooter.playerGuid = player.playerRef.guid;
      this.honors.crazyShooter.honorAmount = player.totalShots;
    }
    if (this.honors.everyBulletCounts.honorAmount > player.totalShots && player.totalShots > 0) {
      this.honors.everyBulletCounts.playerName = player.playerRef.playerName;
      this.honors.everyBulletCounts.playerGuid = player.playerRef.guid;
      this.honors.everyBulletCounts.honorAmount = player.totalShots;
    }
  }

  private computeRatio(player: Player) {
    if (this.honors.topBankable.honorAmount < player.globalRatio) {
      this.honors.topBankable.playerName = player.playerRef.playerName;
      this.honors.topBankable.playerGuid = player.playerRef.guid;
      this.honors.topBankable.honorAmount = player.globalRatio;
    }
    if (this.honors.topBankableForARun.honorAmount < player.ratio[0]) {
      this.honors.topBankableForARun.playerName = player.playerRef.playerName;
      this.honors.topBankableForARun.playerGuid = player.playerRef.guid;
      this.honors.topBankableForARun.honorAmount = player.ratio[0];
    }
    if (this.honors.topBankableForARun.honorAmount < player.ratio[1]) {
      this.honors.topBankableForARun.playerName = player.playerRef.playerName;
      this.honors.topBankableForARun.playerGuid = player.playerRef.guid;
      this.honors.topBankableForARun.honorAmount = player.ratio[1];
    }
  }
}
</script>

<style scoped>
  .hall-of-fame {
    padding: 30px;
    text-align: left;
    background-color: rgba(0, 0, 0, 0.4);
  }
  #app .hall-of-fame h1 {
    margin-left: 490px;
  }
  .hall-of-fame > ul {
    text-align: center;
    display: grid;
    grid-template-columns: repeat(5, 200px);
    grid-gap: 0 20px;
    align-items: center;
  }
  .hall-of-fame > ul > li {
    align-items: center;
    list-style: none;
    margin-bottom: 30px;
  }
  .hall-of-fame > ul > li strong {
    margin-bottom: 10px;
  }
  .hall-of-fame > ul > li i {
    margin-top: 10px;
    margin-bottom: 10px;
    display: block;
  }
  .hall-of-fame .trophy {
    width: 220px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .hall-of-fame .honor-description {
    margin-top: 5px;
  }
  .hall-of-fame .name {
    cursor: pointer;
    color: #36ebff;
  }
  @media (max-width: 1150px) {
    .hall-of-fame {
      padding: 10px;
    }
    .hall-of-fame > ul {
      padding: 0;
      grid-template-columns: 50% 50%;
      grid-gap: 0 5px;
    }
    .hall-of-fame > ul > li {
      margin-bottom: 0;
    }
    .hall-of-fame .trophy {
      width: 180px;
    }
  }
</style>
