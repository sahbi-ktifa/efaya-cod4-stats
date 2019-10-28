import {Player, PlayerForRound, PlayerRef} from "@/model/Player";

export class Round {
    public players: PlayerForRound[] = [];
}

// tslint:disable-next-line:max-classes-per-file
export class GameRef {
    public players: Player[] = [];
    public winnerRef!: PlayerRef;
    public gameType!: string;
    public map!: string;
    public mod!: string;
    public alliesScore = 0;
    public axisScore = 0;
    public rounds: Round[] = [];
    public currentRound: Round = new Round();

    public constructor(mod: string, map: string, gameType: string) {
        this.mod = mod;
        this.map = map;
        this.gameType = gameType;
    }
}

// tslint:disable-next-line:max-classes-per-file
export default class Game {
    public players!: Player[];
    public date!: Date;
    public map!: string;
    public mapPreview!: string;
    public mod!: string;
    public twitchUrl!: string;
    public youtubeUrl!: string;
}
