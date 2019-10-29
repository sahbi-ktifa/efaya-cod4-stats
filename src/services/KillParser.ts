import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";

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
                    if (tokens[3] === tokens[7]) {
                        player.teamKills++;
                    }
                    if (tokens[12] === "head") {
                        player.headShots++;
                    }
                    if (tokens[11] === "MOD_GRENADE_SPLASH") {
                        player.grenadeKills++;
                    }
                    if (tokens[11] === "MOD_PISTOL_BULLET") {
                        player.pistolKills++;
                    }
                    if (tokens[11] === "MOD_RIFLE_BULLET") {
                        player.rifleKills++;
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
                }
                if (player.playerRef.guid === tokens[1]) {
                    player.deaths++;
                }
                // assist handle
            }
        }
    }

}
