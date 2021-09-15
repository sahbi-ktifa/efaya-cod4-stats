import {Player, PlayerRef} from "@/model/Player";
import JoinParser from "@/services/JoinParser";
import Game, {GameRef} from "@/model/Game";
import InitGameParser from "@/services/InitGameParser";
import SRSDEndGameParser from "@/services/SRSDEndGameParser";
import WinParser from "@/services/WinParser";
import KillParser from "@/services/KillParser";
import JoinTeamParser from "@/services/JoinTeamParser";
import KillConfirmedParser from "@/services/KillConfirmedParser";
import KillDeniedParser from "@/services/KillDeniedParser";
import BombDefusedParser from "@/services/BombDefusedParser";
import BombPlantedParser from "@/services/BombPlantedParser";
import TchatterParser from "@/services/TchatterParser";
import AssistParser from "@/services/AssistParser";
import InGameStatParser from "@/services/InGameStatParser";
import SVREndGameParser from "@/services/SVREndGameParser";
import { orderBy } from "lodash";

export enum LogEvent {
    J = "join",
    Q = "Quit",
    W = "Win",
    InitGame = "Init game / round",
    JT = "Join team",
    D = "Damage",
    BP = "Bomb planted",
    BD = "Bomb defused",
    SRKC = "SR Kill confirmed",
    SRKD = "SR Kill denied",
    SR_ENDGAME = "SR end game/round",
    say = "talking",
    sayteam = "talking to team"
}

export class ParsedData {
    public players: PlayerRef[] = [];
    public games: GameRef[] = [];
    public currentGame!: GameRef;
}
const parsers = [
    new InitGameParser(),
    new JoinParser(),
    new SRSDEndGameParser(),
    new WinParser(),
    new KillParser(),
    new JoinTeamParser(),
    new KillConfirmedParser(),
    new KillDeniedParser(),
    new BombDefusedParser(),
    new BombPlantedParser(),
    new TchatterParser(),
    new AssistParser(),
    new InGameStatParser(),
    new SVREndGameParser()
];

// tslint:disable-next-line:max-classes-per-file
export class ParserContext {
    public scoreForVictory!: number;
    public teamSwitch!: boolean;
}

// tslint:disable-next-line:max-classes-per-file
export default class LogsParserService {

    public async parseFile(file: File, ctx: ParserContext) {
        // @ts-ignore
        const content = await file.text();
        const parsedData = new ParsedData();
        let lines = 0;
        content.split(/\r\n|\n/).forEach((line: string) => {
            this.parseLine(line, parsedData, ctx);
            lines++;
        });
        console.log(parsedData);
        const gameRefs = orderBy(parsedData.games.filter((g) => (g.gameType === "sr" || g.gameType === "sd")
            && (g.axisScore === ctx.scoreForVictory || g.alliesScore === ctx.scoreForVictory
                || g.switchGameRef)), "startTime");
        const games = [];
        for (let i = 0; i < gameRefs.length; i += 2) {
            let j = 0;
            let found = false;
            for (; j < gameRefs.length; j++) {
                if (gameRefs[j].map === gameRefs[i].map && j !== i) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                continue;
            }
            const players = gameRefs[j].players.map((p) => new Player(p.playerRef));
            this.computeGameRef(gameRefs[i], 0, players);
            this.computeGameRef(gameRefs[j], 1, players);
            for (const player of gameRefs[i].players) {
                for (const playerRef of players) {
                    if (playerRef.playerRef.guid === player.playerRef.guid) {
                        playerRef.totalPoints += player.totalPoints;
                    }
                }
            }
            for (const player of gameRefs[j].players) {
                for (const playerRef of players) {
                    if (playerRef.playerRef.guid === player.playerRef.guid) {
                        playerRef.totalPoints += player.totalPoints;
                    }
                }
            }
            this.computeConsistency(players);
            games.push(new Game([gameRefs[i], gameRefs[j]], players));
        }
        let parsedContent = "";
        games.forEach((g) => {
            console.log(JSON.stringify(g), g);
            if (g.players.length > 4) {
                parsedContent += JSON.stringify(g) + ",\n";
            }
        });
        // @ts-ignore
        window.games = games;
    }

    private computeGameRef(gameRef: GameRef, roundIndex: number, players: Player[]) {
        for (const round of gameRef.rounds) {
            for (const player of round.players) {
                players
                    .filter((p) => p.playerRef.guid === player.playerRef.guid)
                    .forEach((p) => {
                        p.score[roundIndex] += player.score;
                        p.totalScore += player.score;
                        p.kills[roundIndex] += player.kills;
                        p.totalKills += player.kills;
                        p.assists[roundIndex] += player.assists;
                        p.totalAssists += player.assists;
                        p.deaths[roundIndex] += player.deaths;
                        p.totalDeaths += player.deaths;
                        p.killsConfirmed += player.killsConfirmed;
                        p.killsDenied += player.killsDenied;
                        p.bombsPlanted += player.bombsPlanted;
                        p.bombsDefused += player.bombsDefused;
                        p.headShots += player.headShots;
                        p.teamKills += player.teamKills;
                        p.teamKilled += player.teamKilled;
                        p.headShoted += player.headShoted;
                        p.knifed += player.knifed;
                        p.grenaded += player.grenaded;
                        p.grenadeKills += player.grenadeKills;
                        p.pistolKills += player.pistolKills;
                        p.sniperKills += player.sniperKills;
                        p.rifleKills += player.rifleKills;
                        p.smgKills += player.smgKills;
                        p.shotgunKills += player.shotgunKills;
                        p.meleeKills += player.meleeKills;
                        p.collateralKills += player.collateralKills;
                        p.suicides += player.suicides;
                        p.tchatter += player.tchatter;
                        p.totalShots += player.totalShots;
                        if (player.accuracy > p.accuracy) {
                            p.accuracy = player.accuracy;
                        }
                        if (player.killstreak > p.killstreak) {
                            p.killstreak = player.killstreak;
                        }
                        if (player.deathstreak > p.deathstreak) {
                            p.deathstreak = player.deathstreak;
                        }
                        if (player.longestHS > p.longestHS) {
                            p.longestHS = player.longestHS;
                        }
                        if (player.longestKill > p.longestKill) {
                            p.longestKill = player.longestKill;
                        }
                        if (player.distance > p.distance) {
                            p.distance = player.distance;
                        }
                        if (player.distance < p.camper) {
                            p.camper = player.distance;
                        }
                        if (player.quickestDeath < p.quickestDeath) {
                            p.quickestDeath = player.quickestDeath;
                        }
                        if (player.quickestKill < p.quickestKill) {
                            p.quickestKill = player.quickestKill;
                        }
                        for (const [key] of Object.entries(player.weaps)) {
                            if (!p.weaps[gameRef.mod]) {
                                p.weaps[gameRef.mod] = {};
                            }
                            if (!p.weaps[gameRef.mod][key]) {
                                p.weaps[gameRef.mod][key] = player.weaps[key];
                            } else {
                                p.weaps[gameRef.mod][key] += player.weaps[key];
                            }
                        }
                        for (const [key] of Object.entries(player.parts)) {
                            if (!p.parts[key]) {
                                p.parts[key] = player.parts[key];
                            } else {
                                p.parts[key] += player.parts[key];
                            }
                        }
                        for (const [key] of Object.entries(player.nemesis)) {
                            if (!p.nemesis[key]) {
                                p.nemesis[key] = player.nemesis[key];
                            } else {
                                p.nemesis[key] += player.nemesis[key];
                            }
                        }
                        for (const [key] of Object.entries(player.archangel)) {
                            if (!p.archangel[key]) {
                                p.archangel[key] = player.archangel[key];
                            } else {
                                p.archangel[key] += player.archangel[key];
                            }
                        }
                        for (const [key] of Object.entries(player.prey)) {
                            if (!p.prey[key]) {
                                p.prey[key] = player.prey[key];
                            } else {
                                p.prey[key] += player.prey[key];
                            }
                        }
                        if (round.firstKiller.guid === p.playerRef.guid) {
                            p.firstKiller++;
                        }
                        if (round.firstKilled.guid === p.playerRef.guid) {
                            p.firstKilled++;
                        }
                        if (round.lastKiller.guid === p.playerRef.guid) {
                            p.lastKiller++;
                        }
                        if (round.lastKilled.guid === p.playerRef.guid) {
                            p.lastKilled++;
                        }
                    });
            }
        }
        this.computeRatio(players, roundIndex);
    }

    private computeRatio(players: Player[], roundIndex: number) {
        players
            .forEach((p) => {
                p.ratio[roundIndex] = Number((p.kills[roundIndex] / p.deaths[roundIndex]).toFixed(2));
                if (roundIndex === 1) {
                    p.globalRatio = Number((p.totalKills / p.totalDeaths).toFixed(2));
                }
            });
    }

    private parseLine(line: string, parsedData: ParsedData, ctx: ParserContext) {
        const parser = parsers.filter((p) => p.accept(line))[0];
        if (parser) {
            parser.parse(line, parsedData, ctx);
        }
    }

    private computeConsistency(players: Player[]) {
        for (const playerRef of players) {
            const killRate = playerRef.kills[1] > playerRef.kills[0] ?
                ((playerRef.kills[1] - playerRef.kills[0]) / (playerRef.kills[0] > 0 ? playerRef.kills[0] : playerRef.kills[1])) * 100 :
                ((playerRef.kills[0] - playerRef.kills[1]) / (playerRef.kills[1] > 0 ? playerRef.kills[1] : playerRef.kills[0])) * 100;
            const deathRate = playerRef.deaths[1] > playerRef.deaths[0] ?
                ((playerRef.deaths[1] - playerRef.deaths[0]) / (playerRef.deaths[0] > 0 ? playerRef.deaths[0] : playerRef.deaths[1])) * 100 :
                ((playerRef.deaths[0] - playerRef.deaths[1]) / (playerRef.deaths[1] > 0 ? playerRef.deaths[1] : playerRef.deaths[0])) * 100;
            const scoreRate = playerRef.score[1] > playerRef.score[0] ?
                ((playerRef.score[1] - playerRef.score[0]) / (playerRef.score[0] > 0 ? playerRef.score[0] : playerRef.score[1])) * 100 :
                ((playerRef.score[0] - playerRef.score[1]) / (playerRef.score[1] > 0 ? playerRef.score[1] : playerRef.score[0])) * 100;
            playerRef.consistency = Math.abs((killRate + deathRate + scoreRate) / 3);
        }
    }
}
