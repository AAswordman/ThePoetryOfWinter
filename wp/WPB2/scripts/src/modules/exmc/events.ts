import { ItemStack, Player } from 'mojang-minecraft';
export class  ItemOnHandChangeEvent {
    source: Player;
    beforeItem: ItemStack | undefined;
    afterItem: ItemStack | undefined;
    constructor(beforeItem: ItemStack | undefined, afterItem: ItemStack | undefined,source: Player){
        this.beforeItem = beforeItem;
        this.afterItem = afterItem;
        this.source = source;
    }
}