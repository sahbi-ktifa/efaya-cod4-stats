<template>
    <div class="championship-wrapper">
        <ul>
            <li><h2>Teams engaged:</h2></li>
            <li v-for="team in teams">
                <div class="team-info">
                    <img class="team-logo" alt="Team logo" :src="teamIcon(team.name)">
                    <h2>{{team.name}}</h2>
                </div>
                <div class="team-info">
                    <img v-if="team.map" class="team-map" alt="Team map" :src="teamMap(team.map)">
                    <ul>
                        <li><i>Members:</i></li>
                        <li v-for="member in team.members">
                            <router-link :to="'/player/' + member.guid" tag="strong" class="name">{{member.playerName}}</router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="main-content">
            <img alt="" src="../assets/building.png">
            <h2>Wait until championship begins...</h2>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import season1Teams from "@/data/championship/season1/teams.json";
import {ChampionshipTeam} from "@/model/Championship";

@Component
export default class Championship extends Vue {
    private teams: ChampionshipTeam[] = [];

    public created() {
        for (let i = 0; i < season1Teams.length; i++) {
            this.teams.push(new ChampionshipTeam(season1Teams[i]));
        }
    }

    public teamIcon(team: string): string {
        const images = require.context("../data/championship/season1/icons", false, /\.png$/);
        return images("./" + team + ".png");
    }

    public teamMap(map: string): string {
        return "http://www.customapscod.com/images/maps/cod4/" + map + ".jpg";
    }

}
</script>

<style scoped>
    .championship-wrapper {
        grid-template-columns: 25% 75%;
        display: grid;
        grid-gap: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .championship-wrapper > ul > li {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px dashed white;
    }
    .championship-wrapper > ul > li:first-child {
        padding-bottom: 0;
        margin-bottom: 0;
    }
    .championship-wrapper > ul > li:first-child,
    .championship-wrapper > ul > li:last-child {
        border-bottom: none;
    }
    ul {
        list-style: none;
        padding-left: 0;
    }
    .name {
        cursor: pointer;
        color: #36ebff;
    }
    .team-info {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
    }
    .team-info > ul {
        padding-left: 10px;
    }
    .team-info h2 {
        margin-top: 45px;
        margin-left: 20px;
    }
    .team-logo {
        height: 120px;
    }

    .team-map {
        width: 250px;
    }
</style>
