import Game from "@/model/Game";
import dataEfayaV2 from "@/data/efayav2.json";
import dataImm from "@/data/imm.json";
import dataEfayaV1 from "@/data/efayav1.json";
import dataWW2 from "@/data/ww2.json";
import dataSvr from "@/data/svr.json";
import dataPromod from "@/data/promod.json";
import extraData from "@/data/extradata.json";

const dataMods = [dataImm, dataEfayaV2, dataEfayaV1, dataWW2, dataSvr, dataPromod];

export class DataService {
    public retrieveGames(): Game[] {
        const games: Game[] = [];
        for (let i = 0; i < dataMods.length; i++) {
            for (const key in dataMods[i]) {
                // tslint:disable-next-line:forin
                for (const key2 in extraData) {
                    if (dataMods[i][key].id === extraData[key2].id) {
                        dataMods[i][key].date = extraData[key2].date;
                        dataMods[i][key].mapPreview = extraData[key2].mapPreview;
                        dataMods[i][key].twitchUrl = extraData[key2].twitchUrl;
                        dataMods[i][key].youtubeUrl = extraData[key2].youtubeUrl;
                    }
                }
                games.push(Game.build(dataMods[i][key]));
            }
        }
        return games;
    }
}

export const dataService = new DataService();
