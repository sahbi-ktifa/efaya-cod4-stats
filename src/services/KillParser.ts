import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";
import {POINTS} from "@/model/Game";
import TimeUtils from "./TimeUtils";

export default class KillParser implements LineParser {
    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken) {
            return lastToken.split(";")[0] === "K";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // tslint:disable-next-line:max-line-length
        // 11:50 K;597dce65ed33d9cf4b40064f7550eb82;1;axis;4t4JmD;3cf249f789f3b36a35b4330f3e97bbce;5;axis;iClan|Tecka;m16_mp;84;MOD_RIFLE_BULLET;torso_lower
        const splittedLine = line.split(" ");
        const tokens = splittedLine[splittedLine.length - 1].split(";");
        if (tokens) {
            for (const player of parsedData.currentGame.currentRound.players) {
                if (player.playerRef.guid === tokens[5]) {
                    player.kills++;
                    player.score += POINTS.KILL;
                    if (tokens[3] === tokens[7]) {
                        player.teamKills++;
                    }
                    if (tokens[12] === "head") {
                        player.headShots++;
                    }
                    if (tokens[9] === "frag_grenade_mp" || tokens[9] === "frag_grenade_short_mp") {
                        player.grenadeKills++;
                    }
                    if (tokens[9].indexOf("usp") === 0 || tokens[9].indexOf("beretta") === 0
                        || tokens[9].indexOf("colt") === 0 || tokens[9].indexOf("deserteagle") === 0) {
                        player.pistolKills++;
                    }
                    if (tokens[9].indexOf("m16_") === 0 || tokens[9].indexOf("m4_") === 0
                        || tokens[9].indexOf("g3_") === 0 || tokens[9].indexOf("m14_") === 0
                        || tokens[9].indexOf("ak47") === 0 || tokens[9].indexOf("g36c") === 0
                        || tokens[9].indexOf("mp44") === 0) {
                        player.rifleKills++;
                    }
                    if (tokens[9].indexOf("mp5") === 0 || tokens[9].indexOf("uzi") === 0
                        || tokens[9].indexOf("p90") === 0 || tokens[9].indexOf("ak74u") === 0
                        || tokens[9].indexOf("skorpion") === 0) {
                        player.smgKills++;
                    }
                    if (tokens[9].indexOf("winchester") === 0 || tokens[9].indexOf("m1014") === 0) {
                        player.shotgunKills++;
                    }
                    if (tokens[9].indexOf("barrett") === 0 || tokens[9].indexOf("dragunov") === 0
                        || tokens[9].indexOf("m21") === 0 || tokens[9].indexOf("m40a3") === 0
                        || tokens[9].indexOf("remington") === 0) {
                        player.sniperKills++;
                    }
                    if (tokens[11] === "MOD_MELEE") {
                        player.meleeKills++;
                    }
                    if (tokens[11] === "MOD_EXPLOSIVE") {
                        player.collateralKills++;
                    }
                    if (tokens[11] === "MOD_TRIGGER_HURT" || tokens[11] === "MOD_FALLING"
                        || tokens[11] === "MOD_SUICIDE") {
                        player.suicides++;
                    }
                    if (!player.weaps[tokens[9]]) {
                        player.weaps[tokens[9]] = 0;
                    }
                    player.weaps[tokens[9]]++;
                    if (tokens[12] !== "none") {
                        if (!player.parts[tokens[12]]) {
                            player.parts[tokens[12]] = 0;
                        }
                        player.parts[tokens[12]]++;
                    }
                    if (!player.prey[tokens[1]]) {
                        player.prey[tokens[1]] = 0;
                    }
                    player.prey[tokens[1]]++;
                    if (!player.quickestKill) {
                        player.quickestKill = TimeUtils.getDiffTime(parsedData.currentGame.currentRound.startTime, line);
                    }
                }
                if (player.playerRef.guid === tokens[1]) {
                    player.deaths++;
                    if (!player.nemesis[tokens[5]]) {
                        player.nemesis[tokens[5]] = 0;
                    }
                    player.nemesis[tokens[5]]++;
                    if (!player.quickestDeath) {
                        player.quickestDeath = TimeUtils.getDiffTime(parsedData.currentGame.currentRound.startTime, line);
                    }
                }
            }
        }
    }

}
