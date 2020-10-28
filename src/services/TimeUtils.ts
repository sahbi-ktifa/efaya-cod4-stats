
class TimeUtils {
    public getTime(line: string): number {
        const timeTokens: string[] = line.trim().split(" ")[0].split(":");
        return (Number(timeTokens[0]) * 60) + Number(timeTokens[1]);
    }

    public getDiffTime(refTime: number, line: string): number {
        return refTime - this.getTime(line);
    }

    public getReadableDiffTime(startTime: number, endTime: number): string {
        const secNum = endTime - startTime;
        let hours = Math.floor(secNum / 3600);
        let minutes = Math.floor((secNum - (hours * 3600)) / 60);
        let seconds = secNum - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours = Number("0" + hours); }
        if (minutes < 10) {minutes = Number("0" + minutes); }
        if (seconds < 10) {seconds = Number("0" + seconds); }
        return hours + "h " + minutes + "mins " + seconds;
    }
}

export default new TimeUtils();
