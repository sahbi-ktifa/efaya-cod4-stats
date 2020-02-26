<template>
    <div class="matchmaking-wrapper">
        <div class="pre-matchmaking" v-if="!matchmaking && !matchmakingDone">
            <h2>Matchmaking</h2>
            <p>Choose among players to launch the matchmaking algorithm</p>
            <div class="available-players">
                <div v-for="p in availablePlayers" class="player-card" @click="selectPlayer(p)" :class="{'selected': p.selected}">
                    <span v-if="p.selected">&#10003;</span> {{p.ref.playerName}}
                </div>
            </div>
            <button @click="launch" :disabled="selectedPlayers.length < 4" class="button">Launch MatchMaking!</button>
        </div>
        <div class="matchmaking" v-if="matchmaking && !matchmakingDone">
            <h2>Matchmaking in progress...</h2>
            <h3>{{selectedPlayers.length}} players are being processed!</h3>
            <div class="lds-loader"><div></div><div></div><div></div></div>
        </div>

        <div class="post-matchmaking" v-if="!matchmaking && matchmakingDone">
            <h2>Matchmaking succeeded!!!</h2>
            <p>Algorithm uses EMP (Efaya Matchmaking Points), which is a scientifically determined data based on the last 6 games.</p>
            <div class="matchmaking-result-wrapper">
                <div class="marines">
                    <img src="../assets/marines.png" class="team">
                    <ul class="player-in-team">
                        <li v-for="p in team1">{{p.ref.playerName}} <span class="mean">({{p.mean.toFixed(0)}} EMP)</span></li>
                    </ul>
                </div>
                <div>
                    <img src="../assets/versus.png" class="versus">
                </div>
                <div class="opfor">
                    <img src="../assets/opfor.png" class="team">
                    <ul class="player-in-team">
                        <li v-for="p in team2">{{p.ref.playerName}} <span class="mean">({{p.mean.toFixed(0)}} EMP)</span></li>
                    </ul>
                </div>
            </div>
            <button @click="reset" class="button">Reset</button>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {mapGetters} from "vuex";
import {orderBy} from "lodash";
import Game from "@/model/Game";
import {PlayerRef} from "@/model/Player";

class PlayerCard {
    public ref!: PlayerRef;
    public participations!: number;
    public selected!: boolean;
    public mean!: number;

    constructor(ref: PlayerRef) {
        this.ref = ref;
        this.mean = 0;
        this.participations = 0;
        this.selected = false;
    }
}

@Component({
    computed: {
        ...mapGetters({
            games: "games"
        })
    }
})
export default class MatchMaking extends Vue {

    get selectedPlayers(): PlayerCard[] {
        return this.availablePlayers.filter((p) => p.selected);
    }
    protected games!: Game[];
    private availablePlayers: PlayerCard[] = [];
    private team1: PlayerCard[] = [];
    private team2: PlayerCard[] = [];
    private matchmaking = false;
    private matchmakingDone = false;
    // Old guid of players (Vaas)
    private excludedGuids = ["4d4cd333036a7cc46507cee2bac934c7"];

    public created() {
        this.refreshPlayers();
    }

    public selectPlayer(p: PlayerCard) {
        p.selected = !p.selected;
    }

    public reset() {
        this.matchmakingDone = false;
        this.team1 = [];
        this.team2 = [];
        this.availablePlayers = [];
        this.refreshPlayers();
    }

    public launch() {
        this.matchmaking = true;
        const orderedGames = orderBy(this.games, ["date"], ["asc"])
            .slice(Math.max(this.games.length - 4, 1));
        const playerMeans: any = {};
        this.selectedPlayers.forEach((p) => {
            orderedGames.forEach((g) => {
                const isPlayerPresent = g.players.filter((player) => player.playerRef.guid === p.ref.guid);
                if (isPlayerPresent.length > 0) {
                    if (!playerMeans[p.ref.guid]) {
                        playerMeans[p.ref.guid] = [];
                    }
                    playerMeans[p.ref.guid].push(isPlayerPresent[0].totalScore);
                }
            });
        });
        for (const ref in playerMeans) {
            if (ref) {
                const mean = playerMeans[ref].reduce((a: number, b: number) => a + b, 0) / playerMeans[ref].length;
                this.selectedPlayers.forEach((p) => {
                    if (p.ref.guid === ref) {
                        p.mean = mean;
                    }
                });
            }
        }
        this.computeTeams();
        setTimeout(() => {
            this.matchmaking = false;
            this.matchmakingDone = true;
        }, 3000);
    }

    private refreshPlayers() {
        const players: string[] = [];
        this.games.forEach((g) => {
            g.players.forEach((p) => {
                if (players.indexOf(p.playerRef.guid) === -1 && this.excludedGuids.indexOf(p.playerRef.guid) === -1) {
                    this.availablePlayers.push(new PlayerCard(p.playerRef));
                    players.push(p.playerRef.guid);
                }
            });
        });
        this.availablePlayers = orderBy(this.availablePlayers, ["participations"], ["desc"]);
    }

    private computeTeams() {
        const ladder = orderBy(this.selectedPlayers, ["mean"], ["desc"]);

        this.team1 = [];
        this.team2 = [];
        const opt1 = this.computeDiff(ladder, 3, 2);
        const opt2 = this.computeDiff(ladder, 2, 3);
        this.team1 = opt1[0] < opt2[0] ? opt1[1] as PlayerCard[] : opt2[1] as PlayerCard[];
        this.team2 = opt1[0] < opt2[0] ? opt1[2] as PlayerCard[] : opt2[2] as PlayerCard[];
    }

    private computeDiff(ladder: PlayerCard[], opt1: number, opt2: number) {
        const team1 = [];
        const team2 = [];
        team1.push(ladder[0], ladder[opt1]);
        team2.push(ladder[1], ladder[opt2]);
        for (let i = 4; i < ladder.length; i++) {
            if (i % 2 === 0) {
                team2.push(ladder[i]);
            } else {
                team1.push(ladder[i]);
            }
        }
        return [Math.abs(team1.map((t) => t.mean).reduce((a, b) => a + b, 0)
            - team2.map((t) => t.mean).reduce((a, b) => a + b, 0)), team1, team2];
    }
}
</script>

<style scoped>
    .matchmaking-wrapper {
        background-color: rgba(0, 0, 0, 0.4);
        padding-bottom: 50px;
    }
    .matchmaking-wrapper h2 {
        margin-top: 0;
        padding-top: 20px;
    }
    .available-players {
        display: grid;
        grid-template-columns: 20% 20% 20% 20%;
        grid-gap: 20px;
        margin-bottom: 20px;
    }

    .button[disabled] {
        opacity: 0.7;
    }

    .button {
        cursor: pointer;
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .player-card {
        padding: 10px;
        border: 1px solid white;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
    }
    .player-card.selected {
        color: #36ebff;
    }

    .lds-loader {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }
    .lds-loader div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        background: #dfc;
        animation: lds-loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    .lds-loader div:nth-child(1) {
        left: 8px;
        animation-delay: -0.24s;
    }
    .lds-loader div:nth-child(2) {
        left: 32px;
        animation-delay: -0.12s;
    }
    .lds-loader div:nth-child(3) {
        left: 56px;
        animation-delay: 0;
    }
    @keyframes lds-loader {
        0% {
            top: 8px;
            height: 64px;
        }
        50%, 100% {
            top: 24px;
            height: 32px;
        }
    }

    .matchmaking-result-wrapper {
        display: grid;
        grid-template-columns: 40% 20% 40%;
        grid-gap: 20px;
        margin-bottom: 20px;
        align-items: center;
        padding-left: 15%;
        padding-right: 15%;
    }

    .team, .versus {
        width: 150px;
    }

    .player-in-team {
        list-style: none;
        padding: 0;
    }

    .player-in-team li {
        font-weight: bold;
        font-size: 18px;
    }
    .player-in-team li .mean {
        font-size: 14px;
        font-style: italic;
        color: #36ebff;
    }

    @media (max-width: 1150px) {
        .available-players {
            display: grid;
            grid-template-columns: 45% 45%;
            justify-content: center;
            grid-gap: 10px;
            padding: 10px;
            margin-bottom: 20px;
        }
        .team, .versus {
            width: 60px;
        }
    }

</style>
