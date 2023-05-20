import { EntityEquipmentInventoryComponent, EntityInventoryComponent } from "@minecraft/server";
export default class ExEntityBag {
    constructor(entity) {
        this._entity = entity;
        this.bagComponent = entity.getComponent(EntityInventoryComponent.componentId);
        this.equipmentComponent = entity.getComponent(EntityEquipmentInventoryComponent.componentId);
    }
    getItem(arg) {
        if (typeof (arg) === "number") {
            return this.bagComponent.container.getItem(arg);
        }
        let search = this.searchItem(arg);
        if (search === -1) {
            return undefined;
        }
        return this.bagComponent.container.getItem(search);
    }
    searchItem(id) {
        let items = this.getAllItems();
        for (let i = 0; i < items.length; i++) {
            if (items[i] === undefined) {
                continue;
            }
            if (items[i].typeId === id) {
                return i;
            }
        }
        return -1;
    }
    getAllItems() {
        let items = [];
        for (let i = 0; i < this.size(); i++) {
            items.push(this.bagComponent.container.getItem(i));
        }
        ;
        return items;
    }
    countAllItems() {
        var _a;
        let items = new Map();
        for (let i = 0; i < this.size(); i++) {
            let item = this.getItem(i);
            if (item)
                items.set(item.typeId, item.amount + ((_a = items.get(item.typeId)) !== null && _a !== void 0 ? _a : 0));
        }
        ;
        return items;
    }
    clearItem(msg, amount) {
        if (typeof msg === 'string') {
            let id = msg;
            let res = 0;
            for (let i = 0; i < this.size(); i++) {
                let item = this.getItem(i);
                if ((item === null || item === void 0 ? void 0 : item.typeId) === id) {
                    let suc = this.clearItem(i, amount);
                    res += suc;
                    amount -= suc;
                    if (amount <= 0) {
                        break;
                    }
                }
            }
            return res;
        }
        else {
            let item = this.getItem(msg);
            if (item) {
                if (amount >= item.amount) {
                    this.setItem(msg, undefined);
                    return item.amount;
                }
                else {
                    item.amount -= amount;
                    this.setItem(msg, item);
                    return amount;
                }
            }
            return 0;
        }
    }
    size() {
        return this.bagComponent.inventorySize;
    }
    type() {
        return this.bagComponent.containerType;
    }
    isPrivate() {
        return this.bagComponent.private;
    }
    isRestrictToOwner() {
        return this.bagComponent.restrictToOwner;
    }
    setItem(slot, item) {
        return this.bagComponent.container.setItem(slot, item);
    }
    hasItem(itemId) {
        return this.searchItem(itemId) !== -1;
    }
    addItem(item) {
        this.bagComponent.container.addItem(item);
    }
    getSlot(pos) {
        return this.bagComponent.container.getSlot(pos);
    }
    getEquipment(slot) {
        return this.equipmentComponent.getEquipment(slot);
    }
    setEquipment(slot, equip) {
        return this.equipmentComponent.setEquipment(slot, equip);
    }
    getEquipmentSlot(slot) {
        return this.equipmentComponent.getEquipmentSlot(slot);
    }
}
//# sourceMappingURL=ExEntityBag.js.map