import Game from "@/model/Game";
import extraData from "@/data/extradata.json";
import resultsS1 from "@/data/championship/season1/results.json";
import resultsS2 from "@/data/championship/season2/results.json";
import {PlayerGlobalData} from "@/model/Player";
import {orderBy} from "lodash";
import {format} from "date-fns";

export class DataService {
    private championshipResults: any[] = [];

    constructor() {
        // @ts-ignore
        this.championshipResults["2020"] = resultsS1;
        // @ts-ignore
        this.championshipResults["2021"] = resultsS2;
    }

    public async retrieveGames(season: string): Promise<Game[]> {
        const dataMods = await (await fetch("https://raw.githubusercontent.com/sahbi-ktifa/efaya-cod4-stats/master/src/data/" + season + "/results.json")).json();

        const games: Game[] = [];
        for (let i = 0; i < dataMods.length; i++) {
            for (const extraDataKey in extraData) {
                if (dataMods[i].id === extraData[extraDataKey].id) {
                    dataMods[i].date = extraData[extraDataKey].date;
                    dataMods[i].mapPreview = extraData[extraDataKey].mapPreview;
                    dataMods[i].twitchClips = extraData[extraDataKey].twitchClips;
                    dataMods[i].youtubeUrls = extraData[extraDataKey].youtubeUrls;
                }
            }
            games.push(Game.build(dataMods[i]));
        }
        return games;
    }

    public async retrieveScrims(): Promise<Game[]> {
        const dataMods = await (await fetch("https://raw.githubusercontent.com/sahbi-ktifa/efaya-cod4-stats/master/src/data/scrims/scrims.json")).json();

        const games: Game[] = [];
        for (let i = 0; i < dataMods.length; i++) {
            for (const extraDataKey in extraData) {
                if (dataMods[i].id === extraData[extraDataKey].id) {
                    dataMods[i].date = extraData[extraDataKey].date;
                    dataMods[i].mapPreview = extraData[extraDataKey].mapPreview;
                    dataMods[i].twitchClips = extraData[extraDataKey].twitchClips;
                    dataMods[i].youtubeUrls = extraData[extraDataKey].youtubeUrls;
                }
            }
            games.push(Game.build(dataMods[i]));
        }
        return games;
    }

    public retrieveChampionshipGames(season: string): Game[] {
        const games: Game[] = [];
        // @ts-ignore
        const results = this.championshipResults[season];
        for (const key in results) {
            for (const key2 in extraData) {
                if (results[key].id === extraData[key2].id) {
                    results[key].date = extraData[key2].date;
                    results[key].mapPreview = extraData[key2].mapPreview;
                    results[key].twitchUrl = extraData[key2].twitchUrl;
                    results[key].youtubeUrl = extraData[key2].youtubeUrl;
                }
            }
            games.push(Game.build(results[key]));
        }
        return games;
    }

    public computePlayersPerformance(games: Game[], withMood = true): PlayerGlobalData[] {
        const dataForPlayers: PlayerGlobalData[] = [];
        const dataForPlayersMap: Map<string, PlayerGlobalData> = new Map();
        const orderedGames = orderBy(games, ["date"], ["asc"]);
        orderedGames.forEach((game) => {
            game.players.forEach((player) => {
                let dataForPlayer = dataForPlayersMap.get(player.playerRef.guid);
                if (!dataForPlayer) {
                    dataForPlayer = new PlayerGlobalData(player.playerRef, orderedGames.length);
                    dataForPlayersMap.set(player.playerRef.guid, dataForPlayer);
                }
            });
        });
        let gameIndex = 0;
        orderedGames.forEach((game) => {
            let maxScore = 0;
            game.players.forEach((p) => {
                if (p.totalPoints > maxScore) {
                    maxScore = p.totalPoints;
                }
            });

            game.players.forEach((player) => {
                const dataForPlayer = dataForPlayersMap.get(player.playerRef.guid);
                if (player.totalScore > dataForPlayer!!.bestScore) {
                    dataForPlayer!!.bestScore = player.totalScore;
                }
                if (player.totalKills > dataForPlayer!!.bestKills) {
                    dataForPlayer!!.bestKills = player.totalKills;
                }
                if (player.globalRatio > dataForPlayer!!.bestRatio) {
                    dataForPlayer!!.bestRatio = player.globalRatio;
                }
                if (player.grenadeKills > dataForPlayer!!.bestNades) {
                    dataForPlayer!!.bestNades = player.grenadeKills;
                }
                if (player.meleeKills > dataForPlayer!!.bestKnifes) {
                    dataForPlayer!!.bestKnifes = player.meleeKills;
                }
                if (player.killsConfirmed > dataForPlayer!!.bestExtermination) {
                    dataForPlayer!!.bestExtermination = player.killsConfirmed;
                }
                if (player.killsDenied > dataForPlayer!!.bestMedic) {
                    dataForPlayer!!.bestMedic = player.killsDenied;
                }
                if (player.consistency < dataForPlayer!!.bestConsistency) {
                    dataForPlayer!!.bestConsistency = player.consistency;
                }
                if (player.longestKill > dataForPlayer!!.longestKill) {
                    dataForPlayer!!.longestKill = player.longestKill;
                }
                if (player.killstreak > dataForPlayer!!.killstreak) {
                    dataForPlayer!!.killstreak = player.killstreak;
                }
                if (withMood) {
                    dataForPlayer!!.currentMood[gameIndex].played = true;
                    dataForPlayer!!.currentMood[gameIndex].win = player.totalPoints === maxScore;
                    dataForPlayer!!.currentMood[gameIndex].mapRef = game.map;
                    dataForPlayer!!.currentMood[gameIndex].date = format(game.date, "dd/MM/yyyy");
                }
                dataForPlayersMap.set(player.playerRef.guid, dataForPlayer!!);
            });
            gameIndex++;
        });
        dataForPlayersMap.forEach((data) => {
            dataForPlayers.push(data);
        });
        return dataForPlayers;
    }
}

export const dataService = new DataService();
