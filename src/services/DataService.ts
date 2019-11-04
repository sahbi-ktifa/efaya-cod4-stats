import Game from "@/model/Game";
import data from "@/data/rawdata.json";
import extraData from "@/data/extradata.json";

export class DataService {
    public retrieveGames(): Game[] {
        const games: Game[] = [];
        // tslint:disable-next-line:forin no-shadowed-variable
        for (const key in data) {
            // tslint:disable-next-line:forin
            for (const key2 in extraData) {
                if (data[key].id === extraData[key2].id) {
                    data[key].date = extraData[key2].date;
                    data[key].mapPreview = extraData[key2].mapPreview;
                    data[key].twitchUrl = extraData[key2].twitchUrl;
                    data[key].youtubeUrl = extraData[key2].youtubeUrl;
                }
            }
            games.push(Game.build(data[key]));
        }
        return games;
    }
}

export const dataService = new DataService();
