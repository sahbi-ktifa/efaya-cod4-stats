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
            <h2>Mentions spéciales</h2>
            <div class="trophies">
                <div>
                    <img src="../assets/award/killer.png" class="trophy">
                    <strong>Le tueur</strong><br/>
                    <i>{{totalKills.ref.playerName}} : {{totalKills.value}} kills</i>
                </div>
                <div>
                    <img src="../assets/award/killstreak.png" class="trophy">
                    <strong>La plus longue série de kill</strong><br/>
                    <i>{{killStreak.ref.playerName}} : {{killStreak.value}} kills d'affilés</i>
                </div>
                <div>
                    <img src="../assets/award/longestKill.png" class="trophy">
                    <strong>Le kill le plus lointain</strong><br/>
                    <i>{{longestKill.ref.playerName}} : {{longestKill.value}} mètre(s)</i>
                </div>
            </div>
            <h2>Prochain matchs à jouer :</h2>
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
            <h2>Matchs déjà joués :</h2>
            <ul>
                <li v-for="match in playedMatches">
                    <div class="match-displayer played">
                        <div>
                            <img class="team-logo" alt="Team logo" v-if="match.team1" :src="teamIcon(match.team1)">
                            <h3>{{match.team1}}</h3>
                        </div>
                        <div>
                            <h4>
                                <div>{{match.match1Map}}</div>
                                <div>{{match.match1Result}}</div>
                            </h4>
                            <img src="../assets/versus.png" class="versus">
                            <h4>
                                <div>{{match.match2Map}}</div>
                                <div>{{match.match2Result}}</div>
                            </h4>
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
            <h2>Classement</h2>
            <ul class="ladder">
                <li v-for="team in teamsLadder">
                    <div class="result-team-info">
                        <img class="team-logo" alt="Team logo" v-if="team.name" :src="teamIcon(team.name)">
                        <span><strong>{{team.name}}</strong> <span class="score">{{team.points}} pts</span></span>
                    </div>
                </li>
            </ul>
            <h2>Réglement</h2>
            <ul>
                <li><strong>Efaya mod v2 SR</strong> - 3 joueurs par équipe</li>
                <li>Chaque team choisi <strong>sa map pour le tournoi et n'en change pas</strong>. Les maps doivent avoir été jouées sur notre serveur pour être éligible</li>
                <li>Deux rencontres par équipe : équipe A reçoit équipe B sur sa map pour <strong>deux manches de 5 points gagnants</strong> (le premier à 5), en défense et en attaque. Puis deuxième match où c'est l'équipe B qui reçoit l'équipe A sur sa map, également pour deux manches attaque & défense, soit 4 manches en tout sur deux matchs.</li>
                <li><strong>Calcul des points = score du match + 2 points pour chaque manche gagnée</strong>. (exemple : score final du premier match 4-5 & 5-1 : équipe A perd 4 à 5 en défense et gagne 5 à 1 en attaque, soit 11 points = 4+(5+2) , du coup l'équipe B marque 8 points = (5+2) + 1.</li>
                <li><strong>L'équipe qui commence sa map en défense</strong></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Inject, Vue} from "vue-property-decorator";
    import season1Teams from "@/data/championship/season1/teams.json";
    import season1Calendar from "@/data/championship/season1/calendar.json";
    import {ChampionshipMatch, ChampionshipTeam} from "@/model/Championship";
    import {mapGetters} from "vuex";
    import {MatchmakingService} from "@/services/MatchmakingService";
    import Game from "@/model/Game";
    import results from "@/data/championship/season1/results.json";
    import {orderBy} from "lodash";
    import {Player, PlayerRef} from "@/model/Player";


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
    private matches: ChampionshipMatch[] = [];
    private gameResults: Game[] = [];
    private totalKills: {ref: PlayerRef, value: number} = {ref: {} as PlayerRef, value: 0};
    private killStreak: {ref: PlayerRef, value: number} = {ref: {} as PlayerRef, value: 0};
    private longestKill: {ref: PlayerRef, value: number} = {ref: {} as PlayerRef, value: 0};

    public created() {
        for (let i = 0; i < season1Calendar.length; i++) {
            this.matches.push(new ChampionshipMatch(season1Calendar[i]));
        }
        for (let i = 0; i < season1Teams.length; i++) {
            this.teams.push(new ChampionshipTeam(season1Teams[i]));
        }
        this.teams.forEach((t) => {
            let mean = 0;
            t.members.forEach((m) => mean += this.matchMakingService.computeEMP(m.guid, this.games));
            t.emp = mean / 3;
        });


        this.computeResults();
        for (const gameResult of this.gameResults) {
            const totalKills = this.retrieveValue(gameResult, "totalKills");
            if (this.totalKills.value < totalKills.totalKills) {
                this.totalKills.value = totalKills.totalKills;
                this.totalKills.ref = totalKills.playerRef;
            }
            const killStreak = this.retrieveValue(gameResult, "killstreak");
            if (this.killStreak.value < killStreak.killstreak) {
                this.killStreak.value = killStreak.killstreak;
                this.killStreak.ref = killStreak.playerRef;
            }
            const longestKill = this.retrieveValue(gameResult, "longestKill");
            if (this.longestKill.value < longestKill.longestKill) {
                this.longestKill.value = longestKill.longestKill;
                this.longestKill.ref = longestKill.playerRef;
            }
        }
    }

    get teamsLadder(): ChampionshipTeam[] {
        return orderBy(this.teams, ["points", "name"], ["desc"]);
    }

    get nextMatches(): ChampionshipMatch[] {
        return this.matches.filter((m) => !m.played);
    }

    get playedMatches(): ChampionshipMatch[] {
        return this.matches.filter((m) => m.played);
    }

    public teamIcon(team: string): string {
        const images = require.context("../data/championship/season1/icons", false, /\.png$/);
        return images("./" + team + ".png");
    }

    public teamMap(map: string): string {
        return "http://www.customapscod.com/images/maps/cod4/" + map + ".jpg";
    }

    private computeResults() {
        for (const key in results) {
            this.gameResults.push(Game.build(results[key]));
        }
        for (const gameResult of this.gameResults) {
            for (const gameRef of gameResult.gameRefs) {
                if (gameRef.alliesScore === 5) {
                    const refGuidAllies = gameRef.players.filter((p) => p.team === "allies")[0].playerRef.guid;
                    for (const team of this.teams) {
                        if (team.members.filter((m) => m.guid === refGuidAllies).length > 0) {
                            team.points += 7;
                            break;
                        }
                    }
                    const refAxis = gameRef.players.filter((p) => p.team === "axis")[0];
                    for (const team of this.teams) {
                        if (team.members.filter((m) => m.guid === refAxis.playerRef.guid).length > 0) {
                            team.points += refAxis.totalPoints;
                            break;
                        }
                    }
                } else {
                    const refGuidAxis = gameRef.players.filter((p) => p.team === "axis")[0].playerRef.guid;
                    for (const team of this.teams) {
                        if (team.members.filter((m) => m.guid === refGuidAxis).length > 0) {
                            team.points += 7;
                            break;
                        }
                    }
                    const refAllies = gameRef.players.filter((p) => p.team === "allies")[0];
                    for (const team of this.teams) {
                        if (team.members.filter((m) => m.guid === refAllies.playerRef.guid).length > 0) {
                            team.points += refAllies.totalPoints;
                            break;
                        }
                    }
                }
            }
        }
    }

    private retrieveValue(game: Game, ref: string): Player {
        return orderBy(game.players, [ref], ["desc"])[0];
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
    .right-content ul.ladder  {
        list-style: decimal;
    }
    .right-content .result-team-info {
        display: flex;
        align-items: center;
        margin-top: 6px;
    }
    .right-content .result-team-info > span {
        margin-left: 10px;
    }
    .right-content .result-team-info .score {
        color: #36ebff;
        margin-left: 5px;
    }
    .right-content img {
        height: 35px;
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
    .match-displayer.played .versus {
        width: 35px;
    }
    .match-displayer .team-logo {
        height: 80px;
    }
    .match-displayer h3 {
        margin-left: 20px;
    }
    .match-displayer h4 {
        font-size: 20px;
        font-style: italic;
        font-weight: bold;
        color: #36ebff;
        margin-right: 20px;
    }
    .trophies {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        text-align: center;
    }
    .trophies i {
        color: #36ebff;
    }
    .trophies .trophy {
        width: 180px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>
