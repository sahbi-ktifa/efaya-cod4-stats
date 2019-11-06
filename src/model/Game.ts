import {Player, PlayerForRound, PlayerRef} from "@/model/Player";

export enum POINTS {
    KILL = 10, BOMB_PLANTED = 100, BOMB_DEFUSED = 100, KILL_CONFIRMED = 5, KILL_DENIED = 5, ASSIST = 5
}

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

    public static build(data: any) {
        const game = new Game(data.gameRefs, data.players);
        game.date = new Date(data.date);
        game.mapPreview = data.mapPreview;
        game.twitchUrl = data.twitchUrl;
        game.youtubeUrl = data.youtubeUrl;
        return game;
    }
    public id!: string;
    public gameRefs!: GameRef[];
    public players!: Player[];
    public date!: Date;
    public map!: string;
    public mapPreview!: string;
    public mod!: string;
    public twitchUrl!: string;
    public youtubeUrl!: string;

    constructor(gameRefs: GameRef[], players: Player[]) {
        this.mod = gameRefs[0].mod;
        this.map = gameRefs[0].map;
        this.id = btoa(this.mod + "_" + this.map);
        this.gameRefs = gameRefs;
        this.players = players;
    }
}
