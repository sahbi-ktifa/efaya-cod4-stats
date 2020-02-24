import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";
import {Round} from "@/model/Game";

export default class SVREndGameParser implements LineParser {
    private alliesScore: number = 0;

    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken) {
            return lastToken.split(";")[0] === "TS";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // 2098:17 TS;allies;7
        // 2098:17 TS;axis;10
        const splittedLine = line.split(" ");
        const team = splittedLine[splittedLine.length - 1].split(";")[1];
        if (team === "allies") {
            this.alliesScore = Number(splittedLine[splittedLine.length - 1].split(";")[2].replace(/\\/g, ""));
        } else if (team === "axis") {
            parsedData.currentGame.alliesScore = this.alliesScore;
            parsedData.currentGame.axisScore = Number(splittedLine[splittedLine.length - 1].split(";")[2]);
            parsedData.currentGame.rounds.push(parsedData.currentGame.currentRound);
            parsedData.currentGame.currentRound = new Round();
        }
    }

}
