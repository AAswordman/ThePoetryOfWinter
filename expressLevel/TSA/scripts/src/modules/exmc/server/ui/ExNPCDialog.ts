import { Player } from "@minecraft/server";
import ExMessageAlert from "./ExMessageAlert.js";
import ExPlayer from '../entity/ExPlayer.js';

export default class ExNPCDialog {
    dialogData: Map<string, ExNPCDialogJSON["minecraft:npc_dialogue"]["scenes"][0]> = new Map();
    currentPlayer?: Player;
    constructor(json: ExNPCDialogJSON) {
        let p = json["minecraft:npc_dialogue"].scenes;
        for (let i of p) {
            this.dialogData.set(i.scene_tag, i);
        }
    }
    show(p: Player, scene: string) {
        this.currentPlayer = p;
        const sceneData = this.dialogData.get(scene);
        const dialog = new ExMessageAlert();
        dialog.title(this.getRawText(sceneData?.npc_name))
        if (sceneData?.buttons?.[0]) dialog.button2(this.getRawText(sceneData.buttons[0].name), () => {
            this.runCommands(sceneData.buttons[0].commands);
        })
        if (sceneData?.buttons?.[1]) dialog.button1(this.getRawText(sceneData.buttons[1].name), () => {
            this.runCommands(sceneData.buttons[1].commands);
        })
        dialog.body(this.getRawText(sceneData?.text));

        dialog.show(p);
    }
    getRawText(raw: ExNPCDialogJSONRawtext | undefined) {
        let str = "";
        if (raw) for (let i of raw.rawtext) {
            if (i.translate) str += i.translate;
            if (i.text) str += i.text;
        }
        return str;
    }
    runCommands(cmds: string[]) {
        if (this.currentPlayer) {
            for (let cmd of cmds) {
                if (cmd.includes("dialogue open")) {
                    let d = cmd.split(" ");
                    let tag = d[d.length - 1];
                    if (this.dialogData.has(tag) && cmd.includes("@initiator")) {
                        this.show(this.currentPlayer, tag);
                    }
                } else {
                    cmd = cmd.replace(/initiator/g, "s");
                    if(cmd.startsWith("/")) cmd = cmd.substring(1);
                    ExPlayer.getInstance(this.currentPlayer).command.run(cmd);
                }
            }
        }
    }

}

interface ExNPCDialogJSONRawtext {
    rawtext: {
        translate?: string;
        text?: string;
    }[]
}

export interface ExNPCDialogJSON {
    format_version: string;
    ["minecraft:npc_dialogue"]: {
        scenes: {
            on_close_commands: string[];
            buttons: {
                name: ExNPCDialogJSONRawtext;
                commands: string[];
            }[]
            text: ExNPCDialogJSONRawtext;
            npc_name: ExNPCDialogJSONRawtext;
            scene_tag: string;
        }[];
    }
}