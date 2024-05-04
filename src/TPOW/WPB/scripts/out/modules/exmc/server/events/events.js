import { world } from '@minecraft/server';
export class ItemOnHandChangeEvent {
    constructor(beforeItem, beforeSlot, afterItem, afterSlot, source) {
        this.beforeItem = beforeItem;
        this.afterItem = afterItem;
        this.source = source;
        this.beforeSlot = beforeSlot;
        this.afterSlot = afterSlot;
    }
}
export class PlayerShootProjectileEvent {
    constructor(source, projectile) {
        this.source = source;
        this.projectile = projectile;
    }
}
let exEventNames = {};
for (let k in world.afterEvents) {
    exEventNames[`after${k[0].toUpperCase()}${k.slice(1)}`] = `after${k[0].toUpperCase()}${k.slice(1)}`;
}
for (let k in world.beforeEvents) {
    exEventNames[`before${k[0].toUpperCase()}${k.slice(1)}`] = `before${k[0].toUpperCase()}${k.slice(1)}`;
}
let exOtherEventNameMap = {
    "tick": "tick",
    "beforeTick": "beforeTick",
    "onLongTick": "onLongTick",
    "afterPlayerHurt": "afterPlayerHurt",
    "afterPlayerHitBlock": "afterPlayerHitBlock",
    "afterPlayerHitEntity": "afterPlayerHitEntity",
    "afterItemOnHandChange": "afterItemOnHandChange",
    "afterOnHurt": "afterOnHurt",
    "afterPlayerShootProj": "afterPlayerShootProj"
};
export let ExEventNames = exEventNames;
export let ExOtherEventNames = exOtherEventNameMap;
//# sourceMappingURL=events.js.map