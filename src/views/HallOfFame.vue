<template>
  <div class="hall-of-fame">
    <h1>- &nbsp;Hall of Fame</h1>
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

  public created() {
    const playerPresence: any = {};
    orderBy(this.games, ["date"], ["asc"]).forEach((game) => {
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
      });
    });
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

  public getImgUrl(icon: string): string {
    return require("../assets/award/" + icon + ".png");
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
    margin-left: 450px;
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
</style>
