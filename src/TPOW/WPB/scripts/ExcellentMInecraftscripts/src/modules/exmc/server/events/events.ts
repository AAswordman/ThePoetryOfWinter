import { Entity, ItemStack, Player, WorldAfterEvents, WorldBeforeEvents, world } from '@minecraft/server';
export class ItemOnHandChangeEvent {
    readonly source: Player;
    readonly beforeItem: ItemStack | undefined;
    readonly afterItem: ItemStack | undefined;
    readonly beforeSlot: number;
    readonly afterSlot: number;
    constructor(beforeItem: ItemStack | undefined, beforeSlot: number, afterItem: ItemStack | undefined, afterSlot: number, source: Player) {
        this.beforeItem = beforeItem;
        this.afterItem = afterItem;
        this.source = source;
        this.beforeSlot = beforeSlot;
        this.afterSlot = afterSlot;
    }
}

export class PlayerShootProjectileEvent {
    constructor(public readonly source: Entity,public readonly projectile:Entity) { }
}

export interface TickEvent {
    deltaTime: number;
    currentTick: number;
}
/*
* Merges two types `T` and `P` into a single type.
 * If a property exists in `P`, it will be used, otherwise the property from `T` will be used.
 */
export type Merge<T, P> = {
    [K in keyof (T & P)]: K extends keyof P ? P[K] : K extends keyof T ? T[K] : never;
};
let exEventNames: Merge<
    { [K in keyof WorldAfterEvents as `after${Capitalize<K>}`]: `after${Capitalize<K>}` },
    { [K in keyof WorldBeforeEvents as `before${Capitalize<K>}`]: `before${Capitalize<K>}` }
> = {} as any;
for (let k in world.afterEvents) {
    (exEventNames as any)[`after${k[0].toUpperCase()}${k.slice(1)}`] = `after${k[0].toUpperCase()}${k.slice(1)}`;
}
for (let k in world.beforeEvents) {
    (exEventNames as any)[`before${k[0].toUpperCase()}${k.slice(1)}`] = `before${k[0].toUpperCase()}${k.slice(1)}`;
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
}

export let ExEventNames = exEventNames;
export let ExOtherEventNames: { [K in keyof typeof exOtherEventNameMap]: K } = exOtherEventNameMap as any;