import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";
import {POINTS} from "@/model/Game";

export default class AssistParser implements LineParser {
    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken) {
            return lastToken.split(";")[0] === "A";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // 11:50 A;597dce65ed33d9cf4b40064f7550eb82
        const splittedLine = line.split(" ");
        const tokens = splittedLine[splittedLine.length - 1].split(";");
        if (tokens) {
            for (const player of parsedData.currentGame.currentRound.players) {
                if (player.playerRef.guid === tokens[1]) {
                    player.assists++;
                    player.score += POINTS.ASSIST;
                }
            }
        }
    }

}
