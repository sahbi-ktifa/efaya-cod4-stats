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
export class PlayerRef {
    public guid!: string;
    public playerName!: string;

    public constructor(guid: string, playerName: string) {
        this.guid = guid;
        this.playerName = playerName;
    }
}


// tslint:disable-next-line:max-classes-per-file
export class PlayerForRound {
    public playerRef!: PlayerRef;
    public score = 0;
    public kills = 0;
    public deaths = 0;
    public killsConfirmed = 0;
    public killsDenied = 0;
    public bombsPlanted = 0;
    public bombsDefused = 0;
    public headShots = 0;
    public teamKills = 0;
    public grenadeKills = 0;
    public pistolKills = 0;
    public rifleKills = 0;
    public smgKills = 0;
    public shotgunKills = 0;
    public sniperKills = 0;
    public meleeKills = 0;
    public suicides = 0;
    public tchatter = 0;
    public weaps: any = {};
    public parts: any = {};

    public constructor(playerRef: PlayerRef) {
        this.playerRef = playerRef;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Player {
    public playerRef!: PlayerRef;
    public team!: string;
    public score: number[] = [0, 0];
    public kills: number[] = [0, 0];
    public deaths: number[] = [0, 0];
    public assists: number[] = [0, 0];
    public ratio: number[] = [0, 0];
    public totalPoints: number = 0;
    public totalScore: number = 0;
    public totalKills: number = 0;
    public totalDeaths: number = 0;
    public totalAssists: number = 0;
    public globalRatio: number = 0;
    public killsConfirmed = 0;
    public killsDenied = 0;
    public bombsPlanted = 0;
    public bombsDefused = 0;
    public headShots = 0;
    public teamKills = 0;
    public grenadeKills = 0;
    public pistolKills = 0;
    public rifleKills = 0;
    public smgKills = 0;
    public shotgunKills = 0;
    public sniperKills = 0;
    public meleeKills = 0;
    public suicides = 0;
    public tchatter = 0;
    public weaps: any = {};
    public parts: any = {};

    public constructor(playerRef: PlayerRef) {
        this.playerRef = playerRef;
    }
}
