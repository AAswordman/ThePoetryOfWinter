import { world, Player } from '@minecraft/server';
world.events.itemUse.subscribe(e => {
    if (e.source instanceof Player) {
        e.source.runCommandAsync("function itemuse");
    }
});
world.events.entityHurt.subscribe(e => {
    if (e.damagingEntity instanceof Player) {
        e.damagingEntity.runCommandAsync("function damagingentity");
    }
});