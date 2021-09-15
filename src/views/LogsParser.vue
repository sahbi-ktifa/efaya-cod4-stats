<template>
    <div class="logs-parser">
        <h3>Logs Parser</h3>
        <div>
            <label for="score">Score for victory :</label>
            <input id="score" type="number" v-model="scoreForVictory"/>
        </div>
        <input type="file" ref="logFile" @change="checkFile">
        <button @click="parse()" :disabled="!logFile">Parse!</button>

        <div v-if="games > 0">
            <h1>{{games}} game(s) was/were found !</h1>
            <button @click="copy">Copy last game</button>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LogsParserService from "@/services/LogsParserService";

@Component
export default class LogsParser extends Vue {
    public logFile: File | null =  null;
    public parser = new LogsParserService();
    public games = 0;
    public scoreForVictory: number = 10;

    public async parse() {
        if (this.logFile != null) {
          let scoreForVictory = Number(this.scoreForVictory);
          await this.parser.parseFile(this.logFile, {scoreForVictory: scoreForVictory, teamSwitch: scoreForVictory > 10});
            // @ts-ignore
            this.games = window.games.length;
        }
    }

    public checkFile() {
        this.logFile = (this.$refs.logFile as any).files[0];
    }

    public copy() {
        const el = document.createElement("textarea");
        // @ts-ignore
        const lastGame = window.games[window.games.length - 1];
        el.value = JSON.stringify(lastGame);
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        alert("copied");
    }
}
</script>

<style scoped>
    #app h1 {
        position: initial;
        margin-left: initial;
    }
    #score {
        width: 100px;
        padding: 8px 10px;
        box-sizing: border-box;
        border-radius: 4px;
        margin: 8px 0 8px 15px;
    }
</style>
