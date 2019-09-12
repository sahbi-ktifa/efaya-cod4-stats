export class PlayerGlobalData {
    public playerName!: string;
    public bestScore: number = 0;
    public bestKills: number = 0;
    public bestRatio: number = 0;
    public currentMood: boolean[] = [];

    constructor(playerName: string) {
        this.playerName = playerName;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Player {
    public playerName!: string;
    public points!: number[];
    public score!: number[];
    public kills!: number[];
    public deaths!: number[];
    public assists!: number[];
    public ratio!: number[];
    public totalPoints!: number;
    public totalScore!: number;
    public totalKills!: number;
    public totalDeaths!: number;
    public totalAssists!: number;
    public globalRatio!: number;
}
