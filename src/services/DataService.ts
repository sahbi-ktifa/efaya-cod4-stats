import Game from "@/model/Game";
import dataEfayaV2 from "@/data/efayav2.json";
import dataImm from "@/data/imm.json";
import dataEfayaV1 from "@/data/efayav1.json";
import dataWW2 from "@/data/ww2.json";
import dataSvr from "@/data/svr.json";
import dataPromod from "@/data/promod.json";
import extraData from "@/data/extradata.json";
import results from "@/data/championship/season1/results.json";
import {PlayerGlobalData} from "@/model/Player";
import {orderBy} from "lodash";
import {format} from "date-fns";

const dataMods = [dataImm, dataEfayaV2, dataEfayaV1, dataWW2, dataSvr, dataPromod];

export class DataService {
    public retrieveGames(): Game[] {
        const games: Game[] = [];
        for (let i = 0; i < dataMods.length; i++) {
            for (const key in dataMods[i]) {
                // tslint:disable-next-line:forin
                for (const key2 in extraData) {
                    if (dataMods[i][key].id === extraData[key2].id) {
                        dataMods[i][key].date = extraData[key2].date;
                        dataMods[i][key].mapPreview = extraData[key2].mapPreview;
                        dataMods[i][key].twitchUrl = extraData[key2].twitchUrl;
                        dataMods[i][key].youtubeUrl = extraData[key2].youtubeUrl;
                    }
                }
                games.push(Game.build(dataMods[i][key]));
            }
        }
        return games;
    }

    public retrieveChampionshipGames(): Game[] {
        const games: Game[] = [];
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
