export class HonorData {
    public playerName!: string;
    public playerGuid!: string;
    public honorAmount!: number;
    public description = "";
    public icon = "";

constructor(desc: string = "", icon: string, honorAmount = 0) {
        this.description = desc;
        this.icon = icon;
        this.honorAmount = honorAmount;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Honors {
    public overallKills = new HonorData("Total de victimes sur le serveur", "trophy");
    public topKiller = new HonorData("Joueur ayant fait le plus de victimes", "killer");
    public topKillerForARun = new HonorData("Joueur ayant fait le plus de victimes dans une manche", "killer");
    public topBankable = new HonorData("Joueur ayant le meilleur ratio", "bankable");
    public topBankableForARun = new HonorData("Joueur ayant le meilleur ratio dans une manche", "bankable");
    public tourist = new HonorData("Le joueur qu'on voit rarement", "tourist");
    public goodStudent = new HonorData("Le joueur qu'on voit tout le temps!", "student");
    public headshotMan = new HonorData("Le joueur qui a fait le plus de headshot", "headshot");
    public teamKiller = new HonorData("Le joueur qui joue un peu pour l'autre équipe", "teamkiller");
    public consistent = new HonorData("Le joueur qui a été le plus régulier", "consistency", Infinity);
    public inconsistent = new HonorData("Le joueur qui a été le plus irrégulier", "inconsistency");
    public bomber = new HonorData("Le joueur qui plante toujours la bombe", "bomber");
    public defuser = new HonorData("Le joueur qui defuse toujours la bombe", "defuser");
    public medicineMan = new HonorData("Le joueur qui réanime ses équipiers", "medic");
    public exterminator = new HonorData("Le joueur qui élimine les autres", "exterminator");
    public suicideMan = new HonorData("Mr. Malchance", "suicides");
    public knifeMan = new HonorData("Edward aux mains d'argent", "knife");
    public grenadeMan = new HonorData("Grenade man", "grenade");
    public sniperMan = new HonorData("Le loup solitaire et son sniper", "sniper");
    public shotgunMan = new HonorData("Demolition man", "shotgun");
    public rifleMan = new HonorData("Maître du fusil d'assaut", "rifler");
    public smgMan = new HonorData("Maître des SMG", "smg");
    public pistolMan = new HonorData("Maître du pistolet", "pistol");
    public tchattyMan = new HonorData("Blah Blah Blah", "tchatty");
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
    public playerRef!: PlayerRef;
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
    public bestConsistency: number = Infinity;
    public bestDefused: number = 0;
    public bestPlanted: number = 0;
    public bestParts: any = {};
    public bestWeapons: any = {};
    public currentMood: GameMood[] = [];

    constructor(playerRef: PlayerRef, gamesCount: number) {
        this.playerRef = playerRef;
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
    public nemesis: any = {};
    public prey: any = {};

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
    public nemesis: any = {};
    public prey: any = {};
    public consistency: number = Infinity;

    public constructor(playerRef: PlayerRef) {
        this.playerRef = playerRef;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class PlayerInfoDetails {
    public value = 0;
    public mapRef!: string;
}

// tslint:disable-next-line:max-classes-per-file
export class PlayerInfo {
    public playerRef!: PlayerRef;
    public bestScore = new PlayerInfoDetails();
    public bestKills = new PlayerInfoDetails();
    public bestDeaths = new PlayerInfoDetails();
    public bestAssists = new PlayerInfoDetails();
    public bestRatio = new PlayerInfoDetails();
    public killsConfirmed = new PlayerInfoDetails();
    public killsDenied = new PlayerInfoDetails();
    public bombsPlanted = new PlayerInfoDetails();
    public bombsDefused = new PlayerInfoDetails();
    public headShots = new PlayerInfoDetails();
    public teamKills = new PlayerInfoDetails();
    public grenadeKills = new PlayerInfoDetails();
    public pistolKills = new PlayerInfoDetails();
    public rifleKills = new PlayerInfoDetails();
    public smgKills = new PlayerInfoDetails();
    public shotgunKills = new PlayerInfoDetails();
    public sniperKills = new PlayerInfoDetails();
    public meleeKills = new PlayerInfoDetails();
    public suicides = new PlayerInfoDetails();
    public tchatter = new PlayerInfoDetails();
    public weaps: any = {};
    public parts: any = {};
    public consistency = new PlayerInfoDetails();
    public inconsistency = new PlayerInfoDetails();

    public constructor(playerRef: PlayerRef) {
        this.playerRef = playerRef;
        this.bestDeaths.value = Infinity;
        this.consistency.value = Infinity;
    }
}
