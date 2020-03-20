import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";
import {POINTS} from "@/model/Game";

export default class BombDefusedParser implements LineParser {
    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken) {
            return lastToken.split(";")[0] === "BD" || lastToken.split(";")[0] === "P_D";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // tslint:disable-next-line:max-line-length
        // 30:44 BD;9701265888e7721574509c4dcca83188;10;iClan|Proner
        // 30:44 P_P;9701265888e7721574509c4dcca83188;10;iClan|Proner
        const splittedLine = line.split(" ");
        const tokens = splittedLine[splittedLine.length - 1].split(";");
        if (tokens) {
            for (const player of parsedData.currentGame.currentRound.players) {
                if (player.playerRef.guid === tokens[1]) {
                    player.bombsDefused++;
                    player.score += POINTS.BOMB_DEFUSED;
                }
            }
        }
    }

}
