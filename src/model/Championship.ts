import {PlayerRef} from "@/model/Player";

export class ChampionshipTeam {

    public members!: PlayerRef[];
    public name!: string;
    public map!: string;
    constructor(data: any) {
        this.name = data.name;
        this.map = data.map;
        this.members = data.members;
    }
}
