import {PlayerRef} from "@/model/Player";

export class ChampionshipTeam {
    public members!: PlayerRef[];
    public name!: string;
    public map!: string;
    public emp!: number;

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
    public from!: string;
    public to!: string;
    public played!: boolean;

    constructor(data: any) {
        this.team1 = data.team1;
        this.team2 = data.team2;
        this.from = data.from;
        this.to = data.to;
        this.played = data.played;
    }
}
