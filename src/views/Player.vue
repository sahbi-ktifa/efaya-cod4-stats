<template>
  <div class="player" v-if="player">
    <h2>{{player.playerRef.playerName}}</h2>
    <div>
      <p>
        <strong>Best Score : </strong> <i>{{player.bestScore.value}}</i>
        (<router-link :to="'/game/' + player.bestScore.mapRef" tag="span" class="map">{{player.bestScore.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best Kills : </strong> <i>{{player.bestKills.value}}</i>
        (<router-link :to="'/game/' + player.bestKills.mapRef" tag="span" class="map">{{player.bestKills.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Less Deaths : </strong> <i>{{player.bestDeaths.value}}</i>
        (<router-link :to="'/game/' + player.bestDeaths.mapRef" tag="span" class="map">{{player.bestDeaths.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best Assists : </strong> <i>{{player.bestAssists.value}}</i>
        (<router-link :to="'/game/' + player.bestAssists.mapRef" tag="span" class="map">{{player.bestAssists.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best Ratio : </strong> <i>{{player.bestRatio.value}}</i>
        (<router-link :to="'/game/' + player.bestRatio.mapRef" tag="span" class="map">{{player.bestRatio.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best kill confirmed : </strong> <i>{{player.killsConfirmed.value}}</i>
        (<router-link :to="'/game/' + player.killsConfirmed.mapRef" tag="span" class="map">{{player.killsConfirmed.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best teammate rescued : </strong> <i>{{player.killsDenied.value}}</i>
        (<router-link :to="'/game/' + player.killsDenied.mapRef" tag="span" class="map">{{player.killsDenied.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Most bomb planted : </strong> <i>{{player.bombsPlanted.value}}</i>
        (<router-link :to="'/game/' + player.bombsPlanted.mapRef" tag="span" class="map">{{player.bombsPlanted.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Most bomb defused : </strong> <i>{{player.bombsDefused.value}}</i>
        (<router-link :to="'/game/' + player.bombsDefused.mapRef" tag="span" class="map">{{player.bombsDefused.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best headshots : </strong> <i>{{player.headShots.value}}</i>
        (<router-link :to="'/game/' + player.headShots.mapRef" tag="span" class="map">{{player.headShots.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best teamkills : </strong> <i>{{player.teamKills.value}}</i>
        (<router-link :to="'/game/' + player.teamKills.mapRef" tag="span" class="map">{{player.teamKills.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best grenade kills : </strong> <i>{{player.grenadeKills.value}}</i>
        (<router-link :to="'/game/' + player.grenadeKills.mapRef" tag="span" class="map">{{player.grenadeKills.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best rifle kills : </strong> <i>{{player.rifleKills.value}}</i>
        (<router-link :to="'/game/' + player.rifleKills.mapRef" tag="span" class="map">{{player.rifleKills.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best SMG kills : </strong> <i>{{player.smgKills.value}}</i>
        (<router-link :to="'/game/' + player.smgKills.mapRef" tag="span" class="map">{{player.smgKills.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best sniper kills : </strong> <i>{{player.sniperKills.value}}</i>
        (<router-link :to="'/game/' + player.sniperKills.mapRef" tag="span" class="map">{{player.sniperKills.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best pistol kills : </strong> <i>{{player.pistolKills.value}}</i>
        (<router-link :to="'/game/' + player.pistolKills.mapRef" tag="span" class="map">{{player.pistolKills.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best melee kills : </strong> <i>{{player.meleeKills.value}}</i>
        (<router-link :to="'/game/' + player.meleeKills.mapRef" tag="span" class="map">{{player.meleeKills.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best shotgun kills : </strong> <i>{{player.shotgunKills.value}}</i>
        (<router-link :to="'/game/' + player.shotgunKills.mapRef" tag="span" class="map">{{player.shotgunKills.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best suicides : </strong> <i>{{player.suicides.value}}</i>
        (<router-link :to="'/game/' + player.suicides.mapRef" tag="span" class="map">{{player.suicides.mapRef}}</router-link>)
      </p>
      <p>
        <strong>Best tchat : </strong> <i>{{player.tchatter.value}}</i>
        (<router-link :to="'/game/' + player.tchatter.mapRef" tag="span" class="map">{{player.tchatter.mapRef}}</router-link>)
      </p>
    </div>
    <div class="weap-parts-container">
      <div class="weap-wrapper">
        <h3>Most lethal used weapon (by mod):</h3>
        <ul>
          <li v-for="(values, mod) in player.weaps">
            <h4>{{mod}}</h4>
            <ul>
              <li v-for="weapon in sortByWeaponValues(values)">
                <strong>{{weaponName(weapon, mod)}} : </strong> <i>{{values[weapon]}}</i>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="parts-wrapper">
        <h3>Most frequently hit body part:</h3>
        <ul>
          <li v-for="key in partKeys">
            <strong>{{key}} : </strong> {{player.parts[key].toFixed(0)}} %
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
  import {EfayaModV1Weapons, EfayaV2Weapons, IMMWeapons, WeaponNames} from "@/model/Weapons";

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
  public weaponNamer = {efaya_v2: new EfayaV2Weapons(), imm: new IMMWeapons(), efaya_mod_test: new EfayaModV1Weapons()};
  protected games!: Game[];

  public created() {
    let partsSum = 0;
    this.games.forEach((game) => {
      game.players.forEach((player) => {
        if (player.playerRef.guid === this.$route.params.guid) {
          if (!this.player) {
            this.player = new PlayerInfo(player.playerRef);
          }
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
        }
      });
    });
    if (this.player) {
      for (const [key, value] of Object.entries(this.player.parts)) {
        this.player.parts[key] = (value as number * 100) / partsSum;
      }
      // @ts-ignore
      this.partKeys = Object.keys(this.player.parts).sort((a, b) => this.player.parts[b] - this.player.parts[a]);
    }
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
  }
</style>
