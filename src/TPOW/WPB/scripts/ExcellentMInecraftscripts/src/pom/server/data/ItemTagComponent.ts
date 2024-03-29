import ExTagManager from "../../../modules/exmc/interface/ExTagManager.js";
import ExGameConfig from "../../../modules/exmc/server/ExGameConfig.js";
import PomClient from "../PomClient.js";
import { Occupation } from "../cache/TalentData.js";


export class ItemTagComponentGroup<T>{
    constructor(public tagName: string, public data: T) { }
}
const itemTagComponentType = {
    use_data_group: [new ItemTagComponentGroup<string[]>("", [])],
    armor_protection: [0],
    armor_resilience: [0],
    armor_physical_protection: [0],
    armor_magic_protection: [0],
    armor_physical_reduction: [0],
    armor_magic_reduction: [0],
    armor_type: [new ItemTagComponentGroup<string>("", "")],
    final_physical_reduction: [0],
    final_magic_reduction: [0],
    equipment_type: [new ItemTagComponentGroup<string>("", "")],
    movement_addition: [0],
    underwater_movement_addition: [0],
    attack_addition: [0],
    sneak_movement_addition: [0],
    actual_level: [0],
    remarks: [""]
}
export type ItemTagComponentType = typeof itemTagComponentType;

export default class ItemTagComponent {
    groupCondition?: string[];
    groupBasedOn?: string;
    private components = new Map<string, ItemTagComponentType[keyof ItemTagComponentType]>();
    currentGroup: number = 0;
    constructor(public manager: ExTagManager & { typeId: string }) {
        for (let tag of this.manager.getTags()) {
            let sp = tag.split(":");

            if (!tag.startsWith("comp") || sp.length < 2) continue;
            const msg = [sp[0], sp[1], tag.substring(sp[0].length + sp[1].length + 2)];
            try {
                if (msg[1] === "use_data_group") {
                    this.groupBasedOn = msg[2].split("_:")[0];
                    this.groupCondition = msg[2].substring(msg[2].indexOf("_:") + 1, msg[2].indexOf(":_")).split("::");
                } else {
                    if (msg[1] in itemTagComponentType) {
                        let use: unknown = (itemTagComponentType as any)[msg[1]][0];
                        if (use instanceof ItemTagComponentGroup) {
                            this.components.set(msg[1], msg[2].split("::").map(e =>
                                new ItemTagComponentGroup(e.substring(0, e.indexOf("_:")),
                                    e.substring(e.indexOf("_:") + 2, e.indexOf(":_")))
                            ));
                        } else if (typeof use === "string") {
                            this.components.set(msg[1], msg[2].split("::"));
                        } else if (typeof use === "number") {
                            this.components.set(msg[1], msg[2].split("::").map(e => parseFloat(e.endsWith("%") ? e.substring(0, e.length - 1) : e)));
                        }
                    }
                }

            } catch (e) {
                console.warn("Error while loading component :" + manager.typeId + " / " + msg[1]);
            }

        }

    }
    getComponent<T extends (keyof ItemTagComponentType)>(key: T): ItemTagComponentType[T] {
        return this.components.get(key) as ItemTagComponentType[T];
    }
    isEmpty(){
        return this.components.size === 0;
    }
    getComponentWithGroup<T extends (keyof ItemTagComponentType)>(key: T, group = this.currentGroup): ItemTagComponentType[T][0] {
        const c = this.getComponent(key);
        if (!c || c.length === 0) return itemTagComponentType[key][0];

        if (group >= c.length) {
            return c[c.length - 1];
        }
        return c[group];
    }
    hasComponent<T extends (keyof ItemTagComponentType)>(key: T) {
        return this.components.has(key);
    }
    setGroup(num: number) {
        this.currentGroup = num;
    }
    dataGroupJudge(client: PomClient) {
        if (!this.groupCondition || !this.groupBasedOn) return 0;
        if (this.groupBasedOn === "tag") {
            let c = 0;
            for (let i of this.groupCondition) {
                if (client.exPlayer.hasTag(i)) return c;
                c++;
            }
        } else if (this.groupBasedOn === "occupation") {
            let c = 0;
            for (let i of Occupation.keys) {
                if (i) return c;
                c++;
            }

        }
        return 0;

    }
}