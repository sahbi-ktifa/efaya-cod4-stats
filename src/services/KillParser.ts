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
                }
                if (player.playerRef.guid === tokens[1]) {
                    player.deaths++;
                }
                // teamkill
                // assist handle
                // headshot
                // knife
                // preferred weap
            }
        }
    }

}
