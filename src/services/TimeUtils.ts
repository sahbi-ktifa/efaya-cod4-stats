
class TimeUtils {
    public ROUND_START_DELAY: number = 18;

    public getTime(line: string): number {
        const timeTokens: string[] = line.trim().split(" ")[0].split(":");
        return (Number(timeTokens[0]) * 60) + Number(timeTokens[1]);
    }

    public getDiffTime(refTime: number, line: string): number {
        return this.getTime(line) - refTime;
    }

    public getReadableDiffTime(secNum: number): string {
        let hours = Math.floor(secNum / 3600);
        let minutes = Math.floor((secNum - (hours * 3600)) / 60);
        let seconds = secNum - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours = Number("0" + hours); }
        if (minutes < 10) {minutes = Number("0" + minutes); }
        if (seconds < 10) {seconds = Number("0" + seconds); }
        return (hours > 0 ? hours + "h " : "") + (minutes > 0 ? minutes + "mins " : "") + seconds.toFixed(0) + "s";
    }
}

export default new TimeUtils();
