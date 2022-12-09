export default class ExNPCDialog {
    constructor(json: ExNPCDialogJSON) {
        json
    }
}

interface ExNPCDialogJSONRawtext {
    rawtext: [{
        translate: string;
        text: string;
    }]
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