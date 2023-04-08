import { world, EntityInventoryComponent, ItemStack, ItemTypes, system } from '@minecraft/server';
const initTag = "hh_init";
world.events.playerJoin.subscribe(e => {
    system.runTimeout(() => {
        let arr = Array.from(world.getPlayers({
            name: e.playerName
        }));
        if (arr.length > 0) {
            const p = arr[0];
            if (!p.hasTag(initTag)) {
                p.addTag(initTag);
                p.getComponent(EntityInventoryComponent.componentId)
                    .container.addItem(new ItemStack(ItemTypes.get("minecraft:apple")));
            }
        }
    }, 20 * 10);
});
//# sourceMappingURL=main.js.map