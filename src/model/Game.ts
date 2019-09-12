import {Player} from "@/model/Player";

export default class Game {
    public players!: Player[];
    public date!: Date;
    public map!: string;
    public mapPreview!: string;
    public mod!: string;
    public twitchUrl!: string;
    public youtubeUrl!: string;
}
