import {ParsedData, ParserContext} from "@/services/LogsParserService";

export default interface LineParser {
    accept(line: string): boolean;
    parse(line: string, data: ParsedData, ctx: ParserContext): void;
}
