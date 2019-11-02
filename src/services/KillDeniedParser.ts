import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";
import {POINTS} from "@/model/Game";

export default class KillDeniedParser implements LineParser {
    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken) {
            return lastToken.split(";")[0] === "SRKD";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // tslint:disable-next-line:max-line-length
        // 3:45 SRKD;6fbc20faab02905c8a9b48ffa8569248;11;Ycaare
        const splittedLine = line.split(" ");
        const tokens = splittedLine[splittedLine.length - 1].split(";");
        if (tokens) {
            for (const player of parsedData.currentGame.currentRound.players) {
                if (player.playerRef.guid === tokens[1]) {
                    player.killsDenied++;
                    player.score += POINTS.KILL_DENIED;
                }
            }
        }
    }

}
