import {ParsedData} from "@/services/LogsParserService";

export default interface LineParser {
    accept(line: string): boolean;
    parse(line: string, data: ParsedData): void;
}
