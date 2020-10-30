import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";
import {Round} from "@/model/Game";
import TimeUtils from "./TimeUtils";

export default class SRSDEndGameParser implements LineParser {
    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken) {
            return lastToken.split(";")[0] === "SR_ENDGAME" ||
                lastToken.split(";")[0] === "SD_ENDGAME";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // 3:04 SR_ENDGAME;allies
        // 3:04 SD_ENDGAME;allies
        const splittedLine = line.split(" ");
        const winner = splittedLine[splittedLine.length - 1].split(";")[1];
        if (winner === "allies") {
            parsedData.currentGame.alliesScore++;
            for (const player of parsedData.currentGame.players) {
                if (player.team === "allies") {
                    player.totalPoints++;
                }
            }
        }
        if (winner === "axis") {
            parsedData.currentGame.axisScore++;
            for (const player of parsedData.currentGame.players) {
                if (player.team === "axis") {
                    player.totalPoints++;
                }
            }
        }
        if (winner) {
            parsedData.currentGame.currentRound.endTime = TimeUtils.getTime(line);
            parsedData.currentGame.rounds.push(parsedData.currentGame.currentRound);
            parsedData.currentGame.currentRound = new Round();
            parsedData.currentGame.currentRound.startTime = TimeUtils.getTime(line) + TimeUtils.ROUND_START_DELAY;
        }
    }

}
