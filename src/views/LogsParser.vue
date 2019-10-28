<template>
    <div class="logs-parser">
        <h3>Logs Parser</h3>
        <input type="file" ref="logFile" @change="checkFile">
        <button @click="parse()" :disabled="!logFile">Parse!</button>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LogsParserService from "@/services/LogsParserService";

@Component
export default class LogsParser extends Vue {
    public logFile: File | null =  null;
    public parser = new LogsParserService();

    public async parse() {
        if (this.logFile != null) {
            await this.parser.parseFile(this.logFile);
        }
    }

    public checkFile() {
        this.logFile = (this.$refs.logFile as any).files[0];
    }
}
</script>

<style scoped>

</style>
