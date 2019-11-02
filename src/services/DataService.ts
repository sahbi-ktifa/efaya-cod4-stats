import Game from "@/model/Game";
import data from "@/data/data.json";

export class DataService {
    public retrieveGames(): Game[] {
        const games: Game[] = [];
        // tslint:disable-next-line:forin no-shadowed-variable
        for (const key in data) {
            games.push(Game.build(data[key]));
        }
        return games;
    }
}

export const dataService = new DataService();
