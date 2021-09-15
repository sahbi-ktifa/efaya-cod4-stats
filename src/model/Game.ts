import {Player, PlayerForRound, PlayerRef} from "@/model/Player";

export enum POINTS {
    KILL = 10, BOMB_PLANTED = 20, BOMB_DEFUSED = 20, KILL_CONFIRMED = 5, KILL_DENIED = 5, ASSIST = 5
}

export class Round {
    public players: PlayerForRound[] = [];
    public startTime = 0;
    public endTime = 0;
    public firstKiller!: PlayerRef;
    public firstKilled!: PlayerRef;
    public lastKiller!: PlayerRef;
    public lastKilled!: PlayerRef;
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
    public previousAlliesScore = 0;
    public previousAxisScore = 0;
    public switchGameRef = false;
    public rounds: Round[] = [];
    public currentRound: Round = new Round();
    public startTime = 0;
    public endTime = 0;

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
        game.twitchClips = data.twitchClips;
        game.youtubeUrls = data.youtubeUrls;
        game.id = data.id;
        return game;
    }
    public id!: string;
    public gameRefs!: GameRef[];
    public players!: Player[];
    public date!: Date;
    public map!: string;
    public mapPreview!: string;
    public mod!: string;
    public twitchClips!: string[];
    public youtubeUrls!: string[];

    constructor(gameRefs: GameRef[], players: Player[]) {
        this.mod = gameRefs[0].mod;
        this.map = gameRefs[0].map;
        this.id = btoa(this.mod + "_" + this.map + "_" + Math.random());
        this.gameRefs = gameRefs;
        this.players = players;
    }
}
