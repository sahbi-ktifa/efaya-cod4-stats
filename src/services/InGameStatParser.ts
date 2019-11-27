import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";

export default class InGameStatParser implements LineParser {
    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken && lastToken !== "m") {
            return lastToken.split(";")[0] === "IGS";
        } else if (lastToken === "m") {
            return splittedLine[splittedLine.length - 2].split(";")[0] === "IGS";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // tslint:disable-next-line:max-line-length
        // 132:20 IGS;debd6ca8825f665585b4a6e80850d555;total_shots;53
        // 132:20 IGS;debd6ca8825f665585b4a6e80850d555;accuracy;39
        // killstreak, deathstreak, longestHS, longestKill, distance
        const splittedLine = line.split(" ");
        let tokenSplitter = splittedLine.length - 1;
        if (splittedLine[tokenSplitter] === "m") {
            tokenSplitter--;
        }
        const tokens = splittedLine[tokenSplitter].split(";");
        if (tokens) {
            for (const player of parsedData.currentGame.currentRound.players) {
                if (player.playerRef.guid === tokens[1] && tokens[2] === "total_shots") {
                    player.totalShots++;
                }
                if (player.playerRef.guid === tokens[1] && tokens[2] === "accuracy") {
                    player.accuracy = Number(tokens[3]);
                }
                if (player.playerRef.guid === tokens[1] && tokens[2] === "killstreak") {
                    player.killstreak = Number(tokens[3]);
                }
                if (player.playerRef.guid === tokens[1] && tokens[2] === "deathstreak") {
                    player.deathstreak = Number(tokens[3]);
                }
                if (player.playerRef.guid === tokens[1] && tokens[2] === "longestHS") {
                    player.longestHS = Number(tokens[3]);
                }
                if (player.playerRef.guid === tokens[1] && tokens[2] === "longestKill") {
                    player.longestKill = Number(tokens[3]);
                }
            }
            if (tokens[2] === "distance" && parsedData.currentGame.rounds[parsedData.currentGame.rounds.length - 1]) {
                for (const player of parsedData.currentGame.rounds[parsedData.currentGame.rounds.length - 1].players) {
                    if (player.playerRef.guid === tokens[1]) {
                        player.distance = Number(tokens[3]);
                    }
                }
            }
        }
    }
}
