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
    public topBankable = new HonorData("Joueur ayant le meilleur ratio");
    public topBankableForARun = new HonorData("Joueur ayant le meilleur ratio dans une manche");
    public tourist = new HonorData("Le joueur qu'on voit rarement");
    public goodStudent = new HonorData("Le joueur qu'on voit tout le temps!");
    public headshotMan = new HonorData("Le joueur qui a fait le plus de headshot");
    public bomber = new HonorData("Le joueur qui plante toujours la bombe");
    public defuser = new HonorData("Le joueur qui defuse toujours la bombe");
    public medicineMan = new HonorData("Le joueur qui rescue ses potes");
    public exterminator = new HonorData("Le joueur qui élimine les autres");
    public suicideMan = new HonorData("Mr. Malchance");
    public knifeMan = new HonorData("Edward aux mains d'argent");
    public grenadeMan = new HonorData("Grenade man");
    public sniperMan = new HonorData("Le loup solitaire et son sniper");
    public shotgunMan = new HonorData("Demolition man");
    public rifleMan = new HonorData("Maître du fusil d'assaut");
    public smgMan = new HonorData("Maître des SMG");
    public pistolMan = new HonorData("Pistols master");
    public tchattyMan = new HonorData("Blah Blah Blah");
}

// tslint:disable-next-line:max-classes-per-file
export class GameMood {
    public played: boolean = false;
    public win: boolean = false;
    public mapRef!: string;
    public date!: string;
}

// tslint:disable-next-line:max-classes-per-file
export class PlayerGlobalData {
    public playerName!: string;
    public bestScore: number = 0;
    public bestKills: number = 0;
    public bestRatio: number = 0;
    public bestNades: number = 0;
    public bestKnifes: number = 0;
    public bestRifle: number = 0;
    public bestSniper: number = 0;
    public bestShotgun: number = 0;
    public bestSmg: number = 0;
    public bestMedic: number = 0;
    public bestExtermination: number = 0;
    public bestDefused: number = 0;
    public bestPlanted: number = 0;
    public bestParts: any = {};
    public bestWeapons: any = {};
    public currentMood: GameMood[] = [];

    constructor(playerName: string, gamesCount: number) {
        this.playerName = playerName;
        for (let i = 0; i < gamesCount; i++) {
            this.currentMood[i] = new GameMood();
        }
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
    public assists = 0;
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
