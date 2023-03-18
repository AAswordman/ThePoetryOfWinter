import { world, Player } from '@minecraft/server';
world.events.itemUse.subscribe(e => {
    if (e.source instanceof Player) {
        e.source.runCommandAsync("function itemuse");
    }
});
world.events.entityHurt.subscribe(e => {
    if (e.damageSource.damagingEntity instanceof Player) {
        e.damageSource.damagingEntity.runCommandAsync("function damagingentity");
    }
});
//# sourceMappingURL=main.js.map