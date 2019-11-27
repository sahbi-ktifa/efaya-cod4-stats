<template>
  <div class="player" v-if="player">
    <h2>{{player.playerRef.playerName}}</h2>
    <div>
      <i>Ma Nemesis</i>: <strong class="name" @click="goToPlayer(nemesisGuid)">{{giveMeMyName(nemesisGuid)}}</strong> m'a tué <strong>{{nemesisValue}}</strong> fois<br />
      <i>Ma victime favorite</i>: <strong class="name" @click="goToPlayer(preyGuid)">{{giveMeMyName(preyGuid)}}</strong> que j'ai tué <strong>{{preyValue}}</strong> fois<br />
      <i>Mon ange gardien</i>: <strong class="name" @click="goToPlayer(archangelGuid)">{{giveMeMyName(archangelGuid)}}</strong> qui m'a ranimé <strong>{{archangelValue}}</strong> fois<br />
    </div>
    <div class="personal-data">
      <div>
        <p>
          <strong>Meilleur Score : </strong> <i>{{player.bestScore.value}}</i>
          (<router-link :to="'/game/' + player.bestScore.mapRef" tag="span" class="map">{{player.bestScore.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de Kills : </strong> <i>{{player.bestKills.value}}</i>
          (<router-link :to="'/game/' + player.bestKills.mapRef" tag="span" class="map">{{player.bestKills.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le moins de morts : </strong> <i>{{player.bestDeaths.value}}</i>
          (<router-link :to="'/game/' + player.bestDeaths.mapRef" tag="span" class="map">{{player.bestDeaths.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus d'assistances : </strong> <i>{{player.bestAssists.value}}</i>
          (<router-link :to="'/game/' + player.bestAssists.mapRef" tag="span" class="map">{{player.bestAssists.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Meilleur Ratio : </strong> <i>{{player.bestRatio.value}}</i>
          (<router-link :to="'/game/' + player.bestRatio.mapRef" tag="span" class="map">{{player.bestRatio.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de kill confirmé : </strong> <i>{{player.killsConfirmed.value}}</i>
          (<router-link :to="'/game/' + player.killsConfirmed.mapRef" tag="span" class="map">{{player.killsConfirmed.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de régularité : </strong> <i>{{player.consistency.value ? player.consistency.value.toFixed(1) : "N/A"}}</i>
          (<router-link :to="'/game/' + player.consistency.mapRef" tag="span" class="map">{{player.consistency.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le moins de régularité : </strong> <i>{{player.inconsistency.value ? player.inconsistency.value.toFixed(1) : "N/A"}}</i>
          (<router-link :to="'/game/' + player.inconsistency.mapRef" tag="span" class="map">{{player.inconsistency.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de coéquipiers réanimés : </strong> <i>{{player.killsDenied.value}}</i>
          (<router-link :to="'/game/' + player.killsDenied.mapRef" tag="span" class="map">{{player.killsDenied.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de bombe plantée : </strong> <i>{{player.bombsPlanted.value}}</i>
          (<router-link :to="'/game/' + player.bombsPlanted.mapRef" tag="span" class="map">{{player.bombsPlanted.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de bombe désamorcée : </strong> <i>{{player.bombsDefused.value}}</i>
          (<router-link :to="'/game/' + player.bombsDefused.mapRef" tag="span" class="map">{{player.bombsDefused.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de headshots : </strong> <i>{{player.headShots.value}}</i>
          (<router-link :to="'/game/' + player.headShots.mapRef" tag="span" class="map">{{player.headShots.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de teamkills : </strong> <i>{{player.teamKills.value}}</i>
          (<router-link :to="'/game/' + player.teamKills.mapRef" tag="span" class="map">{{player.teamKills.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de kill à la grenade : </strong> <i>{{player.grenadeKills.value}}</i>
          (<router-link :to="'/game/' + player.grenadeKills.mapRef" tag="span" class="map">{{player.grenadeKills.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de kill au fusil d'assaut : </strong> <i>{{player.rifleKills.value}}</i>
          (<router-link :to="'/game/' + player.rifleKills.mapRef" tag="span" class="map">{{player.rifleKills.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de kill au SMG : </strong> <i>{{player.smgKills.value}}</i>
          (<router-link :to="'/game/' + player.smgKills.mapRef" tag="span" class="map">{{player.smgKills.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de kill au sniper : </strong> <i>{{player.sniperKills.value}}</i>
          (<router-link :to="'/game/' + player.sniperKills.mapRef" tag="span" class="map">{{player.sniperKills.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de kill au pistolet : </strong> <i>{{player.pistolKills.value}}</i>
          (<router-link :to="'/game/' + player.pistolKills.mapRef" tag="span" class="map">{{player.pistolKills.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de kill au couteau : </strong> <i>{{player.meleeKills.value}}</i>
          (<router-link :to="'/game/' + player.meleeKills.mapRef" tag="span" class="map">{{player.meleeKills.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de kill au fusil à pompe : </strong> <i>{{player.shotgunKills.value}}</i>
          (<router-link :to="'/game/' + player.shotgunKills.mapRef" tag="span" class="map">{{player.shotgunKills.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Le plus de suicides : </strong> <i>{{player.suicides.value}}</i>
          (<router-link :to="'/game/' + player.suicides.mapRef" tag="span" class="map">{{player.suicides.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Quand on a beaucoup parlé : </strong> <i>{{player.tchatter.value}}</i>
          (<router-link :to="'/game/' + player.tchatter.mapRef" tag="span" class="map">{{player.tchatter.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Meilleure précision : </strong> <i>{{player.accuracy.value}} %</i>
          (<router-link :to="'/game/' + player.accuracy.mapRef" tag="span" class="map">{{player.accuracy.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Meilleure série de kills : </strong> <i>{{player.killstreak.value}}</i>
          (<router-link :to="'/game/' + player.killstreak.mapRef" tag="span" class="map">{{player.killstreak.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Pire série de morts : </strong> <i>{{player.deathstreak.value}}</i>
          (<router-link :to="'/game/' + player.deathstreak.mapRef" tag="span" class="map">{{player.deathstreak.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Kill le plus lointain : </strong> <i>{{player.longestKill.value}} m</i>
          (<router-link :to="'/game/' + player.longestKill.mapRef" tag="span" class="map">{{player.longestKill.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Headshot le plus lointain : </strong> <i>{{player.longestHS.value}} m</i>
          (<router-link :to="'/game/' + player.longestHS.mapRef" tag="span" class="map">{{player.longestHS.mapRef}}</router-link>)
        </p>
        <p>
          <strong>Distance la plus longue parcouru : </strong> <i>{{player.distance.value}} m</i>
          (<router-link :to="'/game/' + player.distance.mapRef" tag="span" class="map">{{player.distance.mapRef}}</router-link>)
        </p>
      </div>
      <apexchart width="500" type="line" class="apexchart-container" :options="options" :series="series"></apexchart>
    </div>
    <div class="weap-parts-container">
      <div class="weap-wrapper">
        <h3>Les armes les plus utilisées (par mode de jeu):</h3>
        <ul>
          <li v-for="(values, mod) in player.weaps">
            <img class="mod-logo" alt="Mod logo" src="../assets/efaya_mod.png" v-if="isEfayaMod(mod)">
            <img class="mod-logo" alt="Mod logo" src="../assets/efaya_v2.png" v-if="isEfayaModV2(mod)">
            <img class="mod-logo" alt="Mod logo" src="../assets/imm.png" v-if="isIMMMod(mod)">
            <img class="mod-logo" alt="Mod logo" src="../assets/ww2.png" v-if="isWW2Mod(mod)">
            <ul>
              <li v-for="weapon in sortByWeaponValues(values)">
                <strong>{{weaponName(weapon, mod)}} : </strong> <i>{{values[weapon]}}</i>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="parts-wrapper">
        <h3>Les parties du corps les plus touchées:</h3>
        <ul>
          <li v-for="key in partKeys">
            <strong>{{bodyPartName(key)}} : </strong> {{player.parts[key].toFixed(0)}} %
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import Game from "@/model/Game";
import {PlayerInfo} from "@/model/Player";
import {EfayaModV1Weapons, EfayaV2Weapons, IMMWeapons, WeaponNames, WW2Weapons} from "@/model/Weapons";
import { merge } from "lodash";

@Component({
  computed: {
    ...mapGetters({
      games: "games"
    })
  }
})
export default class PlayerDetails extends Vue {
  public player: PlayerInfo | null = null;
  public partKeys: string[] = [];
  public weaponNamer = {
    efaya_v2: new EfayaV2Weapons(), imm: new IMMWeapons(),
    efaya_mod_test: new EfayaModV1Weapons(), ww2m: new WW2Weapons()};
  public nemesisGuid: string = "";
  public nemesisValue: string = "";
  public preyGuid: string = "";
  public preyValue: string = "";
  public archangelGuid: string = "";
  public archangelValue: string = "";
  public killsSeries: number[] = [];
  public deathsSeries: number[] = [];
  public seriesLabels: string[] = [];
  public playedGames: string[] = [];
  protected games!: Game[];

  public created() {
    this.updatePlayerData();
  }

  public updatePlayerData() {
    let partsSum = 0;
    const nemesis: any = {};
    const prey: any = {};
    const archangel: any = {};
    this.player = null;
    this.killsSeries = [];
    this.deathsSeries = [];
    this.seriesLabels = [];
    this.playedGames = [];

    this.games.forEach((game) => {
      game.players.forEach((player) => {
        if (player.playerRef.guid === this.$route.params.guid) {
          if (!this.player) {
            this.player = new PlayerInfo(player.playerRef);
          }
          this.killsSeries.push(player.totalKills);
          this.deathsSeries.push(player.totalDeaths);
          this.seriesLabels.push(game.date.getDate() + "/" + (game.date.getMonth() + 1));
          this.playedGames.push(game.map);
          this.checkInfo(player.totalScore, game.map, "bestScore");
          this.checkInfo(player.totalKills, game.map, "bestKills");
          this.checkInfo(player.totalDeaths, game.map, "bestDeaths", true);
          this.checkInfo(player.totalAssists, game.map, "bestAssists");
          this.checkInfo(player.globalRatio, game.map, "bestRatio");
          this.checkInfo(player.killsConfirmed, game.map, "killsConfirmed");
          this.checkInfo(player.killsDenied, game.map, "killsDenied");
          this.checkInfo(player.bombsPlanted, game.map, "bombsPlanted");
          this.checkInfo(player.bombsDefused, game.map, "bombsDefused");
          this.checkInfo(player.headShots, game.map, "headShots");
          this.checkInfo(player.teamKills, game.map, "teamKills");
          this.checkInfo(player.grenadeKills, game.map, "grenadeKills");
          this.checkInfo(player.pistolKills, game.map, "pistolKills");
          this.checkInfo(player.smgKills, game.map, "smgKills");
          this.checkInfo(player.shotgunKills, game.map, "shotgunKills");
          this.checkInfo(player.rifleKills, game.map, "rifleKills");
          this.checkInfo(player.sniperKills, game.map, "sniperKills");
          this.checkInfo(player.meleeKills, game.map, "meleeKills");
          this.checkInfo(player.suicides, game.map, "suicides");
          this.checkInfo(player.tchatter, game.map, "tchatter");
          this.checkInfo(player.consistency, game.map, "consistency", true);
          this.checkInfo(player.consistency, game.map, "inconsistency");
          this.checkInfo(player.accuracy, game.map, "accuracy");
          this.checkInfo(player.distance, game.map, "distance");
          this.checkInfo(player.longestHS, game.map, "longestHS");
          this.checkInfo(player.longestKill, game.map, "longestKill");
          this.checkInfo(player.killstreak, game.map, "killstreak");
          this.checkInfo(player.deathstreak, game.map, "deathstreak");
          for (const [key, value] of Object.entries(player.parts)) {
            partsSum += value as number;
            if (!this.player.parts[key]) {
              this.player.parts[key] = value;
            } else {
              this.player.parts[key] += value;
            }
          }
          for (const [mod, value] of Object.entries(player.weaps)) {
            if (!this.player.weaps[mod]) {
              this.player.weaps[mod] = {};
            }
            for (const [weap, _value] of Object.entries(value as Object)) {
              if (!this.player.weaps[mod][weap]) {
                this.player.weaps[mod][weap] = _value;
              } else {
                this.player.weaps[mod][weap] += _value;
              }
            }
          }
          if (player.nemesis) {
            for (const [guid, value] of Object.entries(player.nemesis)) {
              if (!nemesis[guid]) {
                nemesis[guid] = 0;
              }
              nemesis[guid] += value;
            }
          }
          if (player.prey) {
            for (const [guid, value] of Object.entries(player.prey)) {
              if (!prey[guid]) {
                prey[guid] = 0;
              }
              prey[guid] += value;
            }
          }
          if (player.archangel) {
            for (const [guid, value] of Object.entries(player.archangel)) {
              if (!archangel[guid]) {
                archangel[guid] = 0;
              }
              archangel[guid] += value;
            }
          }
        }
      });
    });
    if (this.player) {
      this.playedGames = this.playedGames.reverse();
      this.nemesisGuid = Object.keys(nemesis).sort(function(a, b) {return nemesis[a] - nemesis[b]; }).reverse()[0];
      this.nemesisValue = nemesis[this.nemesisGuid];
      this.preyGuid = Object.keys(prey).sort(function(a, b) {return prey[a] - prey[b]; }).reverse()[0];
      this.preyValue = prey[this.preyGuid];
      this.archangelGuid = Object.keys(archangel).sort(function(a, b) {return archangel[a] - archangel[b]; }).reverse()[0];
      this.archangelValue = archangel[this.archangelGuid];
      // @ts-ignore
      for (const [key, value] of Object.entries(this.player.parts)) {
        // @ts-ignore
        this.player.parts[key] = (value as number * 100) / partsSum;
      }
      // @ts-ignore
      this.partKeys = Object.keys(this.player.parts).sort((a, b) => this.player.parts[b] - this.player.parts[a]);
    }
  }

  get options() {
    return {
      title: {
        text: "Evolution kills / deaths"
      },
      chart: {
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        type: "category",
        categories: this.seriesLabels.reverse()
      },
      theme: {
        mode: "dark"
      },
      tooltip: {
        custom: (data: any) => {
          return "<div style='padding: 10px'>" +
                  "<strong>" + this.seriesLabels[data.dataPointIndex] + " - " + this.playedGames[data.dataPointIndex] + "</strong>" +
                  "<div>Kills: " + data.series[0][data.dataPointIndex] + "</div>" +
                  "<div>Deaths: " + data.series[1][data.dataPointIndex] + "</div>" +
                  "</div>";
        },
      },
      stroke: {
        curve: "smooth"
      }
    };
  }
  get series() {
    return [
      {
        name: "Kills",
        data: this.killsSeries.reverse()
      },
      {
        name: "Deaths",
        data: this.deathsSeries.reverse()
      }
    ];
  }

  public giveMeMyName(ref: string): string {
    let name = "";
    this.games.forEach((g) => {
      const found = g.players.find((p) => p.playerRef.guid === ref);
      if (found) {
        name = found.playerRef.playerName;
      }
    });
    return name;
  }

  public goToPlayer(guid: string) {
    this.$router.push({ path: "/player/" + guid});
    this.updatePlayerData();
  }

  public sortByWeaponValues(array: any) {
    return Object.keys(array).sort((a, b) => {
      return array[b] - array[a];
    });
  }

  public weaponName(weapon: string, mod: string): string {
    // @ts-ignore
    if (this.weaponNamer[mod]) {
      // @ts-ignore
      return (this.weaponNamer[mod] as WeaponNames).giveMeMyHumanName(weapon);
    }
    return weapon;
  }

  public bodyPartName(part: string): string {
    switch (part) {
      case "torso_upper":
        return "Torse";
      case "torso_lower":
        return "Ventre";
      case "right_leg_upper":
        return "Cuisse droite";
      case "left_leg_upper":
        return "Cuisse gauche";
      case "right_leg_lower":
        return "Jambe droite";
      case "left_leg_lower":
        return "Jambe gauche";
      case "head":
        return "Pleine tête";
      case "helmet":
        return "Casque";
      case "right_arm_upper":
        return "Biceps droit";
      case "left_arm_upper":
        return "Biceps gauche";
      case "right_arm_lower":
        return "Avant-bras droit";
      case "left_arm_lower":
        return "Avant-bras gauche";
      case "neck":
        return "Cou";
      case "right_foot":
        return "Pied droit";
      case "left_foot":
        return "Pied gauche";
      case "left_hand":
        return "Main gauche";
      case "right_hand":
        return "Main droite";
      default:
        return part;
    }
  }

  public isEfayaMod(mod: string) {
    return mod.startsWith("efaya_mod");
  }

  public isEfayaModV2(mod: string) {
    return mod.startsWith("efaya_v2");
  }

  public isIMMMod(mod: string) {
    return mod.startsWith("imm");
  }

  public isWW2Mod(mod: string) {
    return mod.startsWith("ww2");
  }

  private checkInfo(valueRef: number, map: string, arg: string, desc = false) {
    // @ts-ignore
    if (!desc && valueRef > this.player[arg].value || desc && valueRef < this.player[arg].value) {
      // @ts-ignore
      this.player[arg].value = valueRef;
      // @ts-ignore
      this.player[arg].mapRef = map;
    }
  }
}
</script>

<style scoped>
  .player {
    padding-top: 25px;
    padding-bottom: 30px;
    background-color: rgba(0, 0, 0, 0.4);
  }
  h2 {
    color: #36ebff;
  }
  strong.name {
    color: #36ebff;
    cursor: pointer;
  }
  .map {
    cursor: pointer;
    color: #36ebff;
  }
  .weap-parts-container {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .weap-parts-container li {
    list-style: none;
  }
  .weap-wrapper > ul {
    text-align: left;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-gap: 10px 10px;
  }
  .weap-wrapper > ul > li > ul {
    padding-left: 5px;
  }
  .mod-logo {
    width: 65px;
  }
  .personal-data {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .apexchart-container {
    margin-top: 10px;
    padding: 20px;
  }

  @media (max-width: 1150px) {
    .weap-parts-container {
      grid-template-columns: 100%;
    }
    .weap-wrapper > ul {
      padding: 10px;
      grid-template-columns: 50% 50%;
    }
    .personal-data {
      display: grid;
      grid-template-columns: 100%;
    }
    .apexchart-container {
      display: none;
    }
  }
</style>
