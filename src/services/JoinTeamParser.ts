import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";

export default class JoinTeamParser implements LineParser {
    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken) {
            return lastToken.split(";")[0] === "JT";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // 7:34 JT;357e8601e337dbf72c286cd7a2d7db44;0;axis;iClan|fre2x3;
        const splittedLine = line.split(" ");
        const tokens = splittedLine[splittedLine.length - 1].split(";");
        const team = tokens[3];
        for (const player of parsedData.currentGame.players) {
            if (player.playerRef.guid === tokens[1]) {
                player.team = team;
            }
        }
    }

}
