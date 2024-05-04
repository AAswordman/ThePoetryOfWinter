import ExMessageAlert from "./ExMessageAlert.js";
import ExPlayer from '../entity/ExPlayer.js';
export default class ExNPCDialog {
    constructor(json) {
        this.dialogData = new Map();
        let p = json["minecraft:npc_dialogue"].scenes;
        for (let i of p) {
            this.dialogData.set(i.scene_tag, i);
        }
    }
    show(p, scene) {
        var _a, _b;
        this.currentPlayer = p;
        const sceneData = this.dialogData.get(scene);
        const dialog = new ExMessageAlert();
        dialog.title(this.getRawText(sceneData === null || sceneData === void 0 ? void 0 : sceneData.npc_name));
        if ((_a = sceneData === null || sceneData === void 0 ? void 0 : sceneData.buttons) === null || _a === void 0 ? void 0 : _a[0])
            dialog.button2(this.getRawText(sceneData.buttons[0].name), () => {
                this.runCommands(sceneData.buttons[0].commands);
            });
        if ((_b = sceneData === null || sceneData === void 0 ? void 0 : sceneData.buttons) === null || _b === void 0 ? void 0 : _b[1])
            dialog.button1(this.getRawText(sceneData.buttons[1].name), () => {
                this.runCommands(sceneData.buttons[1].commands);
            });
        dialog.body(this.getRawText(sceneData === null || sceneData === void 0 ? void 0 : sceneData.text));
        dialog.show(p);
    }
    getRawText(raw) {
        let str = "";
        if (raw)
            for (let i of raw.rawtext) {
                if (i.translate)
                    str += i.translate;
                if (i.text)
                    str += i.text;
            }
        return str;
    }
    runCommands(cmds) {
        if (this.currentPlayer) {
            for (let cmd of cmds) {
                if (cmd.includes("dialogue open")) {
                    let d = cmd.split(" ");
                    let tag = d[d.length - 1];
                    if (this.dialogData.has(tag) && cmd.includes("@initiator")) {
                        this.show(this.currentPlayer, tag);
                    }
                }
                else {
                    cmd = cmd.replace(/initiator/g, "s");
                    if (cmd.startsWith("/"))
                        cmd = cmd.substring(1);
                    ExPlayer.getInstance(this.currentPlayer).command.run(cmd);
                }
            }
        }
    }
}
//# sourceMappingURL=ExNPCDialog.js.map