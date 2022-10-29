import ExEntityComponentId from './ExEntityComponentId.js';
import {
    Player,
    EntityInventoryComponent,
    ItemStack
} from "@minecraft/server";

export default class ExPlayerBag {
    private _player: Player;
    bagComponent: EntityInventoryComponent;
    constructor(player: Player) {
        this._player = player;
        this.bagComponent = <EntityInventoryComponent>player.getComponent(ExEntityComponentId.inventory);
    }

    getItem(id: string): ItemStack | undefined;
    getItem(slot: number): ItemStack;
    getItem(arg: any) {
        if (typeof (arg) === "number") {
            return this.bagComponent.container.getItem(arg);
        }
        let search = this.searchItem(arg);
        if (search === -1) {
            return undefined;
        }
        return this.bagComponent.container.getItem(search);
    }
    searchItem(id: string) {
        let items = this.getAllItems();
        for (let i = 0; i < items.length; i++) {
            if (items[i] === undefined) { continue; }
            if (items[i].typeId === id) {
                return i;
            }
        }
        return -1;
    }

    getAllItems() {
        let items = [];
        for (let i = 0; i < this.bagComponent.inventorySize; i++) {
            items.push(this.bagComponent.container.getItem(i));
        };
        return items;
    }

    setItem(slot: number, item: ItemStack) {
        return this.bagComponent.container.setItem(slot, item);
    }

    getItemOnHand() {
        return this.getItem(this._player.selectedSlot);
    }

    hasItem(itemId: string) {
        return this.searchItem(itemId) !== -1;
    }
}