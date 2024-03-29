import ExEntity from './ExEntity.js';
import {
    Container,
    ContainerSlot,
    EntityEquippableComponent,
    EntityInventoryComponent,
    EquipmentSlot,
    ItemStack
} from "@minecraft/server";

export default class ExEntityBag {
    private _entity: ExEntity;
    bagComponent: EntityInventoryComponent;
    equipmentComponent: EntityEquippableComponent;
    constructor(entity: ExEntity) {
        this._entity = entity;
        this.bagComponent = entity.getComponent("minecraft:inventory")!;
        this.equipmentComponent = entity.getComponent("minecraft:equippable")!;
    }

    getItem(id: string): ItemStack | undefined;
    getItem(slot: EquipmentSlot): ItemStack | undefined;
    getItem(slot: number): ItemStack | undefined;
    getItem(arg: string | number) {
        if (typeof (arg) === "number") {
            return (<Container>this.bagComponent.container).getItem(arg);
        }
        if (arg in EquipmentSlot) {
            return this.getEquipment(arg as EquipmentSlot);
        }
        let search = this.searchItem(arg);
        if (!search) {
            return undefined;
        }
        return search.getItem();
    }
    searchItem(id: string | string[]) {
        if (typeof id === "string") id = [id];
        for (let i of this.generateAllSlots()) {
            if (i.getItem() === undefined) { continue; }
            if (id.includes(i.typeId ?? "")) {
                return i;
            }
        }
        return undefined;
    }
    searchItems(id: string | string[]) {
        let from = new Set(id);
        let res = new Map<string, ContainerSlot>();
        if (typeof id === "string") id = [id];
        for (let i of this.generateAllSlots()) {
            if (i.getItem() === undefined) { continue; }
            if (from.has(i.typeId!)) {
                from.delete(i.typeId!);
                res.set(i.typeId!, i);
                if (from.size === 0) break;
            }
        }
        return res;
    }
    indexOf(id: string) {
        for (let i = 0; i < this.size(); i++) {
            if ((<Container>this.bagComponent.container).getItem(i)?.typeId === id) {
                return i;
            }
        }
        return -1;
    }
    getAllItems() {
        let items: (ItemStack | undefined)[] = [];
        items.push(this.itemOnOffHand);
        if (this.bagComponent.container) {
            for (let i = 0; i < this.size(); i++) {
                items.push((<Container>this.bagComponent.container).getItem(i));
            };
        }
        items.push(this.equipmentOnHead);
        items.push(this.equipmentOnChest);
        items.push(this.equipmentOnLegs);
        items.push(this.equipmentOnFeet);
        return items;
    }
    getAllSlots() {
        let items: ContainerSlot[] = [];
        items.push(this.getSlot(EquipmentSlot.Offhand));
        if (this.bagComponent.container) {
            for (let i = 0; i < this.size(); i++) {
                items.push((<Container>this.bagComponent.container).getSlot(i));
            };
        }
        items.push(this.getSlot(EquipmentSlot.Head));
        items.push(this.getSlot(EquipmentSlot.Chest));
        items.push(this.getSlot(EquipmentSlot.Legs));
        items.push(this.getSlot(EquipmentSlot.Feet));
        return items;
    }
    *generateAllSlots() {
        yield this.getSlot(EquipmentSlot.Offhand);
        if (this.bagComponent.container) {
            for (let i = 0; i < this.size(); i++) {
                yield (<Container>this.bagComponent.container).getSlot(i);
            };
        }
        yield this.getSlot(EquipmentSlot.Head);
        yield this.getSlot(EquipmentSlot.Chest);
        yield this.getSlot(EquipmentSlot.Legs);
        yield this.getSlot(EquipmentSlot.Feet);
    }
    countAllItems() {
        let items = new Map<string, number>();
        for (let i of this.getAllItems()) {
            if (i) {
                items.set(i.typeId, i.amount + (items.get(i.typeId) ?? 0));
            }
        };
        return items;
    }
    clearItem(msg: string | ContainerSlot | number, amount: number):number {
        if (typeof msg === 'string') {
            let id = msg;
            let res = 0;
            for (let i of this.generateAllSlots()) {
                if (i.getItem()?.typeId === id) {
                    let suc = this.clearItem(i, amount);
                    res += suc;
                    amount -= suc;
                    if (amount <= 0) {
                        break;
                    }
                }
            }
            return res;
        } else if (msg instanceof ContainerSlot) {
            let item = msg.getItem();
            if (item) {
                if (amount >= item.amount) {
                    msg.setItem(undefined);
                    return item.amount;
                } else {
                    item.amount -= amount;
                    msg.setItem(item);
                    return amount;
                }
            }
            return 0;
        } else {
            return this.clearItem(this.getSlot(msg),amount);
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

    setItem(slot: number | EquipmentSlot, item: ItemStack | undefined) {
        if (typeof slot === 'string') {
            return this.setEquipment(slot, item);
        }
        return (<Container>this.bagComponent.container).setItem(slot, <ItemStack>item);
    }

    hasItem(itemId: string) {
        return this.searchItem(itemId) !== undefined;
    }
    addItem(item: ItemStack) {
        (<Container>this.bagComponent.container).addItem(item);
    }
    getSlot(pos: number | EquipmentSlot) {
        if (typeof pos === 'string') {
            return this.getEquipmentSlot(pos);
        }
        return (<Container>this.bagComponent.container).getSlot(pos);
    }

    getEquipment(slot: EquipmentSlot) {
        return this.equipmentComponent.getEquipment(slot);
    }
    setEquipment(slot: EquipmentSlot, equip: ItemStack | undefined) {
        return this.equipmentComponent.setEquipment(slot, equip);
    }
    getEquipmentSlot(slot: EquipmentSlot) {
        return this.equipmentComponent.getEquipmentSlot(slot);
    }


    get itemOnMainHand() {
        return this.getItem(EquipmentSlot.Mainhand);
    }
    set itemOnMainHand(item: ItemStack | undefined) {
        this.setItem(EquipmentSlot.Mainhand, item);
    }
    get itemOnOffHand() {
        return this.getItem(EquipmentSlot.Offhand);
    }
    set itemOnOffHand(item: ItemStack | undefined) {
        this.setItem(EquipmentSlot.Offhand, item);
    }
    get equipmentOnHead() {
        return this.getItem(EquipmentSlot.Head);
    }
    set equipmentOnHead(item: ItemStack | undefined) {
        this.setItem(EquipmentSlot.Head, item);
    }
    get equipmentOnChest() {
        return this.getItem(EquipmentSlot.Chest);
    }
    set equipmentOnChest(item: ItemStack | undefined) {
        this.setItem(EquipmentSlot.Chest, item);
    }
    get equipmentOnFeet() {
        return this.getItem(EquipmentSlot.Feet);
    }
    set equipmentOnFeet(item: ItemStack | undefined) {
        this.setItem(EquipmentSlot.Feet, item);
    }
    get equipmentOnLegs() {
        return this.getItem(EquipmentSlot.Legs);
    }
    set equipmentOnLegs(item: ItemStack | undefined) {
        this.setItem(EquipmentSlot.Legs, item);
    }
}