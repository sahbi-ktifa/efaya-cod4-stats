<template>
  <div class="hall-of-fame">
    <h1>This is the iClan Hall of Fame</h1>
    <ul>
      <li v-for="(honor, propertyName) in honors">
        <div>
          <img src="../assets/trophy.jpg" class="trophy">
          <strong>{{propertyName}}</strong><br/>
          <i v-if="propertyName !== 'overallKills'">{{honor.playerName}} {{honor.honorAmount}}</i>
          <i v-if="propertyName === 'overallKills'">{{honors.overallKills}}</i>
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
        this.honors.overallKills += player.totalKills;
        this.computeKills(player);
        this.computeAssists(player);
        this.computeRatio(player);
        if (!playerPresence[player.playerName]) {
          playerPresence[player.playerName] = 1;
        } else {
          playerPresence[player.playerName]++;
        }
      });
    });
    let touristKey = null;
    let touristValue = Number.MAX_SAFE_INTEGER;
    for (const key in playerPresence) {
      if (playerPresence[key] > this.honors.goodStudent.honorAmount) {
        this.honors.goodStudent.playerName = key;
        this.honors.goodStudent.honorAmount = playerPresence[key];
      }
      if (playerPresence[key] <= touristValue) {
        touristValue = playerPresence[key];
        touristKey = key;
      }
    }
    if (touristKey) {
      this.honors.tourist.playerName = touristKey;
      this.honors.tourist.honorAmount = playerPresence[touristKey];
    }
  }

  private computeKills(player: Player) {
    if (this.honors.topKiller.honorAmount < player.totalKills) {
      this.honors.topKiller.playerName = player.playerName;
      this.honors.topKiller.honorAmount = player.totalKills;
    }
    if (this.honors.topKillerForARun.honorAmount < player.kills[0]) {
      this.honors.topKillerForARun.playerName = player.playerName;
      this.honors.topKillerForARun.honorAmount = player.kills[0];
    }
    if (this.honors.topKillerForARun.honorAmount < player.kills[1]) {
      this.honors.topKillerForARun.playerName = player.playerName;
      this.honors.topKillerForARun.honorAmount = player.kills[1];
    }
  }

  private computeAssists(player: Player) {
    if (this.honors.topAssister.honorAmount < player.totalAssists) {
      this.honors.topAssister.playerName = player.playerName;
      this.honors.topAssister.honorAmount = player.totalAssists;
    }
    if (this.honors.topAssisterForARun.honorAmount < player.assists[0]) {
      this.honors.topAssisterForARun.playerName = player.playerName;
      this.honors.topAssisterForARun.honorAmount = player.assists[0];
    }
    if (this.honors.topAssisterForARun.honorAmount < player.assists[1]) {
      this.honors.topAssisterForARun.playerName = player.playerName;
      this.honors.topAssisterForARun.honorAmount = player.assists[1];
    }
  }

  private computeRatio(player: Player) {
    if (this.honors.topBankable.honorAmount < player.globalRatio) {
      this.honors.topBankable.playerName = player.playerName;
      this.honors.topBankable.honorAmount = player.globalRatio;
    }
    if (this.honors.topBankableForARun.honorAmount < player.ratio[0]) {
      this.honors.topBankableForARun.playerName = player.playerName;
      this.honors.topBankableForARun.honorAmount = player.ratio[0];
    }
    if (this.honors.topBankableForARun.honorAmount < player.ratio[1]) {
      this.honors.topBankableForARun.playerName = player.playerName;
      this.honors.topBankableForARun.honorAmount = player.ratio[1];
    }
  }
}
</script>

<style scoped>
  .hall-of-fame {
    padding: 30px;
    text-align: left;
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
  .hall-of-fame .trophy {
    width: 150px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .hall-of-fame .honor-description {
    margin-top: 5px;
  }
</style>
