import {Player, PlayerForRound, PlayerRef} from "@/model/Player";
import {ParsedData} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";

export default class JoinParser implements LineParser {
    public accept(line: string): boolean {
        const splittedLine = line.split(" ");
        const lastToken = splittedLine[splittedLine.length - 1];
        if (lastToken) {
            return lastToken.split(";")[0] === "J";
        }
        return false;
    }

    public parse(line: string, parsedData: ParsedData): void {
        // 574:39 J;6fbc20faab02905c8a9b48ffa8569248;11;Ycaare
        const splittedLine = line.split(" ");
        const tokens = splittedLine[splittedLine.length - 1].split(";");
        const playerRef = new PlayerRef(tokens[1], tokens[3]);
        if (parsedData.players.filter((p) => p.guid === tokens[1]).length === 0) {
            parsedData.players.push(playerRef);
        }
        if (parsedData.currentGame.players.filter((p) => p.playerRef.guid === playerRef.guid).length === 0) {
            parsedData.currentGame.players.push(new Player(playerRef));
        }
        // tslint:disable-next-line:max-line-length
        if (parsedData.currentGame.currentRound.players.filter((p) => p.playerRef.guid === playerRef.guid).length === 0) {
            parsedData.currentGame.currentRound.players.push(new PlayerForRound(playerRef));
        }
    }

}
