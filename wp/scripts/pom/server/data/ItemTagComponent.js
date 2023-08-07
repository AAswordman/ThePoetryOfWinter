import { Occupation } from "../cache/TalentData.js";
export class ItemTagComponentGroup {
    constructor(tagName, data) {
        this.tagName = tagName;
        this.data = data;
    }
}
const itemTagComponentType = {
    use_data_group: [new ItemTagComponentGroup("", [])],
    armor_protection: [0],
    armor_resilience: [0],
    armor_physical_protection: [0],
    armor_magic_protection: [0],
    armor_physical_reduction: [0],
    armor_magic_reduction: [0],
    armor_type: [new ItemTagComponentGroup("", "")],
    equipment_type: [new ItemTagComponentGroup("", "")],
    movement_addition: [0],
    underwater_movement_addition: [0],
    attack_addition: [0],
    sneak_movement_addition: [0],
    actual_level: [0],
    remarks: [""]
};
export default class ItemTagComponent {
    constructor(manager) {
        this.manager = manager;
        this.components = new Map();
        this.currentGroup = 0;
        for (let tag of this.manager.getTags()) {
            let sp = tag.split(":");
            if (!tag.startsWith("comp") || sp.length < 2)
                continue;
            const msg = [sp[0], sp[1], tag.substring(sp[0].length + sp[1].length + 2)];
            try {
                if (msg[1] === "use_data_group") {
                    this.groupBasedOn = msg[2].split("_:")[0];
                    this.groupCondition = msg[2].substring(msg[2].indexOf("_:") + 1, msg[2].indexOf(":_")).split("::");
                }
                else {
                    if (msg[1] in itemTagComponentType) {
                        let use = itemTagComponentType[msg[1]][0];
                        if (use instanceof ItemTagComponentGroup) {
                            this.components.set(msg[1], msg[2].split("::").map(e => new ItemTagComponentGroup(e.substring(0, e.indexOf("_:")), e.substring(e.indexOf("_:") + 2, e.indexOf(":_")))));
                        }
                        else if (typeof use === "string") {
                            this.components.set(msg[1], msg[2].split("::"));
                        }
                        else if (typeof use === "number") {
                            this.components.set(msg[1], msg[2].split("::").map(e => parseFloat(e.endsWith("%") ? e.substring(0, e.length - 1) : e)));
                        }
                    }
                }
            }
            catch (e) {
                console.warn("Error while loading component :" + manager.typeId + " / " + msg[1]);
            }
        }
    }
    getComponent(key) {
        return this.components.get(key);
    }
    getComponentWithGroup(key, group = this.currentGroup) {
        const c = this.getComponent(key);
        if (!c || c.length === 0)
            return itemTagComponentType[key][0];
        if (group >= c.length) {
            return c[c.length - 1];
        }
        return c[group];
    }
    hasComponent(key) {
        return this.components.has(key);
    }
    setGroup(num) {
        this.currentGroup = num;
    }
    dataGroupJudge(client) {
        if (!this.groupCondition || !this.groupBasedOn)
            return 0;
        if (this.groupBasedOn === "tag") {
            let c = 0;
            for (let i of this.groupCondition) {
                if (client.exPlayer.hasTag(i))
                    return c;
                c++;
            }
        }
        else if (this.groupBasedOn === "occupation") {
            let c = 0;
            for (let i of Occupation.keys) {
                if (i)
                    return c;
                c++;
            }
        }
        return 0;
    }
}
//# sourceMappingURL=ItemTagComponent.js.map