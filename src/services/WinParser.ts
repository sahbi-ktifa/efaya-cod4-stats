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
        if (tokens) {
            parsedData.currentGame.winnerRef = new PlayerRef(tokens[1], tokens[3]);
            delete parsedData.currentGame.alliesScore;
            delete parsedData.currentGame.axisScore;
        }
    }

}
