import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";
import {POINTS} from "@/model/Game";

export default class BombPlantedParser implements LineParser {
    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken) {
            return lastToken.split(";")[0] === "BP";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // tslint:disable-next-line:max-line-length
        // 30:44 BP;9701265888e7721574509c4dcca83188;10;iClan|Proner
        const splittedLine = line.split(" ");
        const tokens = splittedLine[splittedLine.length - 1].split(";");
        if (tokens) {
            for (const player of parsedData.currentGame.currentRound.players) {
                if (player.playerRef.guid === tokens[1]) {
                    player.bombsPlanted++;
                    player.score += POINTS.BOMB_PLANTED;
                }
            }
        }
    }

}
