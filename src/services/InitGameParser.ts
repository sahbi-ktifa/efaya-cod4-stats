import {ParsedData, ParserContext} from "@/services/LogsParserService";
import LineParser from "@/services/LineParser";
import {GameRef} from "@/model/Game";
import TimeUtils from "./TimeUtils";

export default class InitGameParser implements LineParser {
    public accept(line: string): boolean {
        return line.indexOf("InitGame") > -1;
    }

    public parse(line: string, parsedData: ParsedData, ctx: ParserContext): void {
        // tslint:disable-next-line:max-line-length
        // 575:01 InitGame: \_Admin\Gamoul\_Location\France\_Website\www.iclan.net\fs_game\mods/efaya_mod_test\g_compassShowEnemies\0\g_gametype\sr\gamename\Call of Duty 4\mapname\mp_naout\protocol\6\shortversion\1.7\sv_allowAnonymous\0\sv_disableClientConsole\0\sv_floodprotect\1\sv_hostname\^7i^1C^7lan.net ^1Efaya_mod\sv_maxclients\32\sv_maxPing\0\sv_maxRate\25000\sv_minPing\0\sv_privateClients\0\sv_punkbuster\0\sv_pure\0\sv_voice\1\ui_maxclients\32
        const tokens = line.split("\\");
        // tslint:disable-next-line:one-variable-per-declaration
        let mod, map, gameType = "";
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "fs_game") {
                mod = tokens[i + 1].split("/")[1];
            } else if (tokens[i] === "g_gametype") {
                gameType = tokens[i + 1];
            } else if (tokens[i] === "mapname") {
                map = tokens[i + 1];
            }
        }
        if (!parsedData.currentGame) {
            // @ts-ignore
            parsedData.currentGame = new GameRef(mod, map, gameType);
            parsedData.currentGame.startTime = TimeUtils.getTime(line);
            parsedData.currentGame.currentRound.startTime = TimeUtils.getTime(line) + TimeUtils.ROUND_START_DELAY;
        } else if (parsedData.currentGame &&
            (parsedData.currentGame.gameType !== gameType || parsedData.currentGame.map !== map)) {
            if (parsedData.currentGame.players.length > 2 &&
                (parsedData.currentGame.alliesScore === ctx.scoreForVictory
                    || parsedData.currentGame.axisScore === ctx.scoreForVictory)) {
                parsedData.currentGame.endTime = TimeUtils.getTime(line);
                parsedData.games.push(parsedData.currentGame);
            }
            if (parsedData.currentGame.winnerRef) {
                // @ts-ignore
                parsedData.currentGame = new GameRef(mod, map, gameType);
            }
            // @ts-ignore
            parsedData.currentGame = new GameRef(mod, map, gameType);
            parsedData.currentGame.startTime = TimeUtils.getTime(line);
            parsedData.currentGame.currentRound.startTime = TimeUtils.getTime(line) + TimeUtils.ROUND_START_DELAY;
        } else if (parsedData.currentGame && (parsedData.currentGame.alliesScore === ctx.scoreForVictory
            || parsedData.currentGame.axisScore === ctx.scoreForVictory)) {
            parsedData.currentGame.endTime = TimeUtils.getTime(line);
            parsedData.games.push(parsedData.currentGame);
            // @ts-ignore
            parsedData.currentGame = new GameRef(mod, map, gameType);
            parsedData.currentGame.startTime = TimeUtils.getTime(line);
            parsedData.currentGame.currentRound.startTime = TimeUtils.getTime(line) + TimeUtils.ROUND_START_DELAY;
        }

    }

}
