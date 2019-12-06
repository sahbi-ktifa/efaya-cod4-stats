import Game from "@/model/Game";

export class GameService {
    public computeWinnersLosers(game: Game): any {
        const team1 = game.gameRefs[0].alliesScore + game.gameRefs[1].axisScore;
        const team2 = game.gameRefs[0].axisScore + game.gameRefs[1].alliesScore;
        const winnerPoints: number[] = [];
        const loserPoints: number[] = [];
        let winnersGuid: string[] = [];
        let losersGuid: string[] = [];
        if (team1 > team2) {
            winnerPoints[0] = game.gameRefs[0].alliesScore;
            winnerPoints[1] = game.gameRefs[1].axisScore;
            loserPoints[0] = game.gameRefs[0].axisScore;
            loserPoints[1] = game.gameRefs[1].alliesScore;
            const winners = game.gameRefs[0].players.filter((p) => p.team === "allies").map((p) => p.playerRef.guid);
            winners.concat(game.gameRefs[1].players.filter((p) => p.team === "axis").map((p) => p.playerRef.guid));
            winnersGuid = Array.from(new Set(winners));
            const losers = game.gameRefs[0].players.filter((p) => p.team === "axis").map((p) => p.playerRef.guid);
            losers.concat(game.gameRefs[1].players.filter((p) => p.team === "allies").map((p) => p.playerRef.guid));
            losersGuid = Array.from(new Set(losers));
        } else {
            winnerPoints[0] = game.gameRefs[0].axisScore;
            winnerPoints[1] = game.gameRefs[1].alliesScore;
            loserPoints[0] = game.gameRefs[0].alliesScore;
            loserPoints[1] = game.gameRefs[1].axisScore;
            const winners = game.gameRefs[0].players.filter((p) => p.team === "axis").map((p) => p.playerRef.guid);
            winners.concat(game.gameRefs[1].players.filter((p) => p.team === "allies").map((p) => p.playerRef.guid));
            winnersGuid = Array.from(new Set(winners));
            const losers = game.gameRefs[0].players.filter((p) => p.team === "allies").map((p) => p.playerRef.guid);
            losers.concat(game.gameRefs[1].players.filter((p) => p.team === "axis").map((p) => p.playerRef.guid));
            losersGuid = Array.from(new Set(losers));
        }
        return [winnersGuid, losersGuid, winnerPoints, loserPoints];
    }
}
