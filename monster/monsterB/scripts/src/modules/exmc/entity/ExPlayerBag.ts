import ExEntityComponentId from './ExEntityComponentId.js';
import {
    Player,
    EntityInventoryComponent,
    ItemStack
} from "mojang-minecraft";

export default class ExPlayerBag {
    private _player: Player;
    bagComponent: EntityInventoryComponent;
    constructor(player: Player) {
        this._player = player;
        this.bagComponent = <EntityInventoryComponent>player.getComponent(ExEntityComponentId.inventory);
    }

    getItem(num:number) {
        return this.bagComponent.container.getItem(num);
    }


    getAllItems() {
        let items = [];
        for (let i = 0; i < this.bagComponent.inventorySize; i++) {
            items.push(this.bagComponent.container.getItem(i));
        };
        return items;
    }
    
    setItem(num: number, item: ItemStack) {
        return this.bagComponent.container.setItem(num, item);
    }

    getItemOnHand() {
        return this.getItem(this._player.selectedSlot);
    }
}