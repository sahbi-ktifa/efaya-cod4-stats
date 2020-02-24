import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";
import {PlayerRef} from "@/model/Player";

export default class WinParser implements LineParser {
    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken) {
            return lastToken.split(";")[0] === "W";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // For DM gametype
        // 8:28 W;b7b1da41943afca6c7feb084c19e6bcc;2;El-Jefe
        const splittedLine = line.split(" ");
        const tokens = splittedLine[splittedLine.length - 1].split(";");
        if (tokens && tokens.length === 4) {
            parsedData.currentGame.winnerRef = new PlayerRef(tokens[1], tokens[3]);
            delete parsedData.currentGame.alliesScore;
            delete parsedData.currentGame.axisScore;
        }
        // tslint:disable-next-line:max-line-length
        if (parsedData.currentGame.mod === "svr" && parsedData.currentGame.gameType === "sd") { // Dirty fix for SVR team assignations
            // tslint:disable-next-line:max-line-length
            // 2053:52 W;allies;debd6ca8825f665585b4a6e80850d555;iClan|Vaas;001489cdb1e13dc0cfe6ecbf94e73b2e;iClan|gamoul;357e8601e337dbf72c286cd7a2d7db44;iClan|fre2x3;90189ba6d585b3313ac24ff1df0a0f04;iClan|AnGeL;130236d724d02bcdd927e1622bdac598;iClan|Cedmac;6b9a493118e3ea88731d2d577c68b57d;iClan|RooKMooT
            const team = tokens[1];
            for (let i = 2; i < tokens.length; i += 2) {
                for (const player of parsedData.currentGame.players) {
                    if (player.playerRef.guid === tokens[i]) {
                        player.team = team;
                    }
                }
            }
            for (const player of parsedData.currentGame.players) {
                if (!player.team) {
                    player.team = team === "allies" ? "axis" : "allies";
                }
                if (player.team === "axis") {
                    player.totalPoints = parsedData.currentGame.axisScore;
                } else {
                    player.totalPoints = parsedData.currentGame.alliesScore;
                }
            }
        }
    }

}
