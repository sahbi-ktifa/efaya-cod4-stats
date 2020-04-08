import Game from "@/model/Game";


export class MatchmakingService {
    public computeEMP(playerGuid: string, games: Game[]): number {
        const means: any = [];
        games.forEach((g) => {
            const isPlayerPresent = g.players.filter((player) => player.playerRef.guid === playerGuid);
            if (isPlayerPresent.length > 0) {
                if (means.length < 4) {
                    means.push(isPlayerPresent[0].totalScore);
                }
            }
        });
        return means.reduce((a: number, b: number) => a + b, 0) / means.length;
    }
}

export const matchMakingService = new MatchmakingService();
