<template>
  <div id="app">
    <img class="iclan-logo" alt="IClan logo" src="./assets/iclan.png">
    <img class="cod4-logo" alt="COD4 logo" src="./assets/cod4.png">
    <div id="header-banner"></div>
    <div id="nav">
      <router-link to="/">Soirées</router-link> |
      <router-link to="/players">Joueurs</router-link> |
      <router-link to="/halloffame">La creme de la creme</router-link> |
      <router-link to="/matchmaking">Matchmaking</router-link>
    </div>
    <h1 class="long">COD4 iClan Statistiques</h1>
    <h1 class="short">iClan Stats</h1>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
import {DataService} from "@/services/DataService";

@Component
export default class App extends Vue {
  @Inject("dataService") public dataService!: DataService;

  public async created() {
    const games = await this.dataService.retrieveGames();
    this.$store.commit("gamesRetrieved", games);
  }
}
</script>

<style>
  html {
    background: url("assets/background.jpg") no-repeat center center fixed;
    background-size: cover;
  }
  body {
    margin: 0;
    line-height: 1.5;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
  }
  #app h1 {
    position: absolute;
    margin-left: 140px;
    top: 0;
  }
  #app .iclan-logo {
    position: absolute;
    top: 10px;
    left: 10px;
    height: 110px;
    z-index: 1;
  }
  #app .cod4-logo {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 110px;
    z-index: 1;
  }
  #header-banner {
    padding: 65px;
    background-color: black;
    opacity: 0.5;
    z-index: 0;
  }
  #nav {
    position: absolute;
    top: 75px;
    left: 145px;
    text-transform: uppercase;
  }
  #nav a {
    font-weight: bold;
    color: white;
    text-decoration: none;
  }

  #nav a.router-link-exact-active {
    color: #36ebff;
  }

  .short {
    display: none;
  }

  @media (max-width: 640px) {
    .cod4-logo, .parser {
      display: none;
    }
    .short {
      display: block;
    }
    .long {
      display: none;
    }
  }
</style>
