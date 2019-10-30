import {PlayerRef} from "@/model/Player";
import JoinParser from "@/services/JoinParser";
import {GameRef} from "@/model/Game";
import InitGameParser from "@/services/InitGameParser";
import SRSDEndGameParser from "@/services/SRSDEndGameParser";
import WinParser from "@/services/WinParser";
import KillParser from "@/services/KillParser";
import JoinTeamParser from "@/services/JoinTeamParser";
import KillConfirmedParser from "@/services/KillConfirmedParser";
import KillDeniedParser from "@/services/KillDeniedParser";
import BombDefusedParser from "@/services/BombDefusedParser";
import BombPlantedParser from "@/services/BombPlantedParser";
import TchatterParser from "@/services/TchatterParser";

export enum LogEvent {
    J = "join",
    Q = "Quit",
    W = "Win",
    InitGame = "Init game / round",
    JT = "Join team",
    D = "Damage",
    BP = "Bomb planted",
    BD = "Bomb defused",
    SRKC = "SR Kill confirmed",
    SRKD = "SR Kill denied",
    SR_ENDGAME = "SR end game/round",
    say = "talking",
    sayteam = "talking to team"
}

export class ParsedData {
    public players: PlayerRef[] = [];
    public games: GameRef[] = [];
    public currentGame!: GameRef;
}
const parsers = [
    new InitGameParser(),
    new JoinParser(),
    new SRSDEndGameParser(),
    new WinParser(),
    new KillParser(),
    new JoinTeamParser(),
    new KillConfirmedParser(),
    new KillDeniedParser(),
    new BombDefusedParser(),
    new BombPlantedParser(),
    new TchatterParser()
];

// tslint:disable-next-line:max-classes-per-file
export default class LogsParserService {

    public async parseFile(file: File) {
        // @ts-ignore
        const content = await file.text();
        const parsedData = new ParsedData();
        let lines = 0;
        content.split(/\r\n|\n/).forEach((line: string) => {
            this.parseLine(line, parsedData);
            lines++;
        });
        // tslint:disable-next-line:no-console
        console.log(lines, parsedData);
    }

    private parseLine(line: string, parsedData: ParsedData) {
        const parser = parsers.filter((p) => p.accept(line))[0];
        if (parser) {
            parser.parse(line, parsedData);
        }
    }
}
