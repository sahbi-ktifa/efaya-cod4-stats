import {PlayerRef} from "@/model/Player";

export class ChampionshipTeam {
    public members!: PlayerRef[];
    public name!: string;
    public map!: string;
    public emp!: number;
    public points: number = 0;

    constructor(data: any) {
        this.name = data.name;
        this.map = data.map;
        this.members = data.members;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ChampionshipMatch {
    public team1!: string;
    public team2!: string;
    public played!: boolean;
    public match1Map!: string;
    public match1MapName!: string;
    public match1Result!: string;
    public match1Id!: string;
    public match2Map!: string;
    public match2MapName!: string;
    public match2Result!: string;
    public match2Id!: string;

    constructor(data: any) {
        this.team1 = data.team1;
        this.team2 = data.team2;
        this.played = data.played;
        this.match1Map = data.match1Map;
        this.match1MapName = data.match1MapName;
        this.match2Map = data.match2Map;
        this.match2MapName = data.match2MapName;
        this.match1Result = data.match1Result;
        this.match2Result = data.match2Result;
        this.match1Id = data.match1Id;
        this.match2Id = data.match2Id;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class FinalMatch {
    public team1!: string;
    public team2!: string;
    public matchMap!: string;
    public matchMapName!: string;
    public matchResult!: string;
    public matchId!: string;
    public final!: boolean;
    public smallFinal!: boolean;

    constructor(data: any) {
        this.team1 = data.team1;
        this.team2 = data.team2;
        this.matchMap = data.matchMap;
        this.matchMapName = data.matchMapName;
        this.matchResult = data.matchResult;
        this.matchId = data.matchId;
        this.final = data.final;
        this.smallFinal = data.smallFinal;
    }
}
