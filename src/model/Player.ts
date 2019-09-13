export class HonorData {
    public playerName!: string;
    public honorAmount = 0;
    public description = "";

    constructor(desc: string = "") {
        this.description = desc;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Honors {
    public overallKills = 0;
    public topKiller = new HonorData("Joueur ayant fait le plus de victimes");
    public topKillerForARun = new HonorData("Joueur ayant fait le plus de victimes dans une manche");
    public topAssister = new HonorData("Joueur ayant fait le plus d'assists");
    public topAssisterForARun = new HonorData("Joueur ayant fait le plus d'assists dans une manche");
    public topBankable = new HonorData("Joueur ayant le meilleur ratio");
    public topBankableForARun = new HonorData("Joueur ayant le meilleur ratio dans une manche");
    public tourist = new HonorData("Le joueur qu'on voit rarement");
    public goodStudent = new HonorData("Le joueur qu'on voit tout le temps!");
}

// tslint:disable-next-line:max-classes-per-file
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
