import axios from "axios";
import * as key from "@/key";
import Game from "@/model/Game";

axios.defaults.headers.common["secret-key"] = key.jsonBinKey;
const collectionId = "5d701ecf2d1fb96463c4b42a";

export class DataService {
    public retrieveGames(): Promise<any> {
        return axios.get("https://api.jsonbin.io/e/collection/" + collectionId + "/all-bins");
    }

    public retrieveGame(id: string): Promise<any> {
        return axios.get(`https://api.jsonbin.io/b/${id}/latest`);
    }
}

export const dataService = new DataService();
