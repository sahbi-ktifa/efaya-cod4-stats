<template>
  <div id="app">
    <h2>COD4 iClan Statistics</h2>
    <img class="iclan-logo" alt="IClan logo" src="./assets/iclan.png">
    <img class="cod4-logo" alt="COD4 logo" src="./assets/cod4.png">
    <div id="nav">
      <router-link to="/">Games</router-link> |
      <router-link to="/players">Players</router-link> |
      <router-link to="/halloffame">Hall of fame</router-link>
      <router-link to="/parser">Parser</router-link>
    </div>
    <div v-if="loading" class="loader"></div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
import {DataService} from "@/services/DataService";

@Component
export default class App extends Vue {
  @Inject("dataService") public dataService!: DataService;
  private loading = false;

  public async created() {
    this.loading = true;
    const res = await this.dataService.retrieveGames();
    if (res.data.records) {
      for (const record of res.data.records) {
        const game = await this.dataService.retrieveGame(record.id);
        if (game.data.date) {
          const date = game.data.date.split("/");
          game.data.date = new Date(`${date[2]}-${date[1]}-${date[0]}`);
        }
        this.$store.commit("gameRetrieved", game.data);
      }
    }
    this.loading = false;
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #app .iclan-logo {
    position: absolute;
    top: 10px;
    left: 10px;
    height: 150px;
  }
  #app .cod4-logo {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 150px;
  }
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #a9e79e;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    position: absolute;
    top: 10px;
    left: 180px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
