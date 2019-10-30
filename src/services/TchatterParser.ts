import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";

export default class TchatterParser implements LineParser {
    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken) {
            return lastToken.split(";")[0] === "say";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // 16:27 say;ee37f4649620e4ab801fa0854caa2b98;1;iClan|Louis92;TOUJOURS PLUS
        const splittedLine = line.split(" ");
        const tokens = splittedLine[splittedLine.length - 1].split(";");
        if (tokens) {
            for (const player of parsedData.currentGame.currentRound.players) {
                if (player.playerRef.guid === tokens[1]) {
                    player.tchatter++;
                }
            }
        }
    }

}
