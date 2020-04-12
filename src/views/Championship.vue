<template>
    <div class="championship-wrapper">
        <ul>
            <li><h2>Teams engagées:</h2></li>
            <li v-for="team in teams">
                <div class="team-info">
                    <img class="team-logo" alt="Team logo" v-if="team.name" :src="teamIcon(team.name)">
                    <h2>{{team.name}} </h2>
                    <span class="mean">({{team.emp.toFixed(0)}} EMP)</span>
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
            <h2>Prochain matchs à jouer du {{nextMatches[0].from}} au {{nextMatches[0].to}} :</h2>
            <ul>
                <li v-for="match in nextMatches">
                    <div class="match-displayer">
                        <div>
                            <img class="team-logo" alt="Team logo" v-if="match.team1" :src="teamIcon(match.team1)">
                            <h3>{{match.team1}}</h3>
                        </div>
                        <div>
                            <img src="../assets/versus.png" class="versus">
                        </div>
                        <div>
                            <img class="team-logo" alt="Team logo" v-if="match.team2" :src="teamIcon(match.team2)">
                            <h3>{{match.team2}}</h3>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="right-content">
            <h3>Classement</h3>
            <ul>
                <li>Waiting for results...</li>
            </ul>
            <h3>Règlement</h3>
            <ul>
                <li><strong>Efaya mod v2 SR</strong> - 3 joueurs par équipe</li>
                <li>Chaque team choisi <strong>sa map pour le tournoi et n'en change pas</strong>. Les maps doivent avoir été jouées sur notre serveur pour être éligible</li>
                <li>Deux rencontres par équipe : équipe A reçoit équipe B sur sa map pour <strong>deux manches de 5 points gagnants</strong> (le premier à 5), en défense et en attaque. Puis deuxième match où c'est l'équipe B qui reçoit l'équipe A sur sa map, également pour deux manches attaque & défense, soit 4 manches en tout sur deux matchs.</li>
                <li><strong>Calcul des points = score du match + 2 points pour chaque manche gagnée</strong>. (exemple : score final du premier match 4-5 & 5-1 : équipe A perd 4 à 5 en défense et gagne 5 à 1 en attaque, soit 11 points = 4+(5+2) , du coup l'équipe B marque 8 points = (5+2) + 1.</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Inject, Vue} from 'vue-property-decorator';
import season1Teams from "@/data/championship/season1/teams.json";
import season1Calendar from "@/data/championship/season1/calendar.json";
import {ChampionshipMatch, ChampionshipTeam} from '@/model/Championship';
import {mapGetters} from 'vuex';
import {MatchmakingService} from '@/services/MatchmakingService';
import Game from '@/model/Game';

@Component({
    computed: {
        ...mapGetters({
            games: "games"
        })
    }
})
export default class Championship extends Vue {
    @Inject("matchMakingService") public matchMakingService!: MatchmakingService;
    protected games!: Game[];
    private teams: ChampionshipTeam[] = [];
    private currentMatch = 0;
    private matches: ChampionshipMatch[] = [];

    get nextMatches(): ChampionshipMatch[] {
        const start = 3 * this.currentMatch;
        return this.matches.slice(start, start + 3);
    }

    public created() {
        for (let i = 0; i < season1Calendar.length; i++) {
            this.matches.push(new ChampionshipMatch(season1Calendar[i]));
        }
        for (let i = 0; i < season1Teams.length; i++) {
            this.teams.push(new ChampionshipTeam(season1Teams[i]));
        }
        this.teams.forEach(t => {
            var mean = 0;
            t.members.forEach(m => mean += this.matchMakingService.computeEMP(m.guid, this.games));
            t.emp = mean / 3;
        });
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
        background-color: rgba(0, 0, 0, 0.4);
        grid-template-columns: 25% 50% 25%;
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
    .mean {
        font-size: 14px;
        font-style: italic;
        font-weight: bold;
        color: #36ebff;
        margin-top: 25px;
        margin-left: 10px;
    }
    .main-content, .right-content {
        text-align: left;
    }
    .right-content ul {
        list-style: initial;
    }
    .versus {
        width: 85px;
        margin: auto;
    }
    .match-displayer {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        margin-bottom: 20px;
    }
    .match-displayer > div {
        display: flex;
    }
    .match-displayer .team-logo {
        height: 80px;
    }
    .match-displayer h3 {
        margin-left: 20px;
    }
</style>
