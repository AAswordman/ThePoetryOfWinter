import ExEntityComponentId from './ExEntityComponentId.js';
import ExEntity from './ExEntity.js';
import {
    EntityInventoryComponent,
    ItemStack
} from "mojang-minecraft";
import ExPlayer from './ExPlayer.js';

export default class ExEntityBag {
    private _entity: ExEntity;
    bagComponent: EntityInventoryComponent;
    constructor(entity: ExEntity) {
        this._entity = entity;
        this.bagComponent = entity.getInventoryComponent();
    }

    getItem(id: string): ItemStack | undefined;
    getItem(slot: number): ItemStack | undefined;
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
            if (items[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    getAllItems() {
        let items = [];
        for (let i = 0; i < this.size(); i++) {
            items.push(this.bagComponent.container.getItem(i));
        };
        return items;
    }
    size() {
        return this.bagComponent.inventorySize;
    }

    type(){
        return this.bagComponent.containerType;
    }

    isPrivate(){
        return this.bagComponent.private;
    }

    isRestrictToOwner(){
        return this.bagComponent.restrictToOwner;
    }

    setItem(slot: number, item: ItemStack) {
        return this.bagComponent.container.setItem(slot, item);
    }

    hasItem(itemId: string) {
        return this.searchItem(itemId) !== -1;
    }
}

export class ExPlayerBag extends ExEntityBag{
    private _player: ExPlayer;
    constructor(player: ExPlayer){
        super(player);
        this._player = player;
    }
    getItemOnHand() {
        return this.getItem(this._player.selectedSlot);
    }
}