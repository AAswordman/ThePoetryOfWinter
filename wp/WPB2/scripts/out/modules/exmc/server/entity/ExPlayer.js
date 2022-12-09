import { GameMode, MinecraftEntityTypes } from '@minecraft/server';
import ExEntity from "./ExEntity.js";
import { ExPlayerBag } from "./ExEntityBag.js";
import ExGameVector3 from '../math/ExGameVector3.js';
export default class ExPlayer extends ExEntity {
    setGameMode(mode) {
        switch (mode) {
            case GameMode.survival:
                this.runCommandAsync(`gamemode 0`);
                break;
            case GameMode.creative:
                this.runCommandAsync(`gamemode 1`);
                break;
            case GameMode.adventure:
                this.runCommandAsync(`gamemode 2`);
                break;
            case GameMode.spectator:
                this.runCommandAsync(`gamemode 3`);
                break;
        }
    }
    getGameMode() {
        var _a, _b, _c, _d;
        let c = GameMode.creative;
        c = (((_a = Array.from(this.getDimension().getEntities({
            location: ExGameVector3.getLocation(this.entity.location),
            type: MinecraftEntityTypes.player.id,
            closest: 1,
            maxDistance: 1,
            gameMode: GameMode.adventure
        }))) === null || _a === void 0 ? void 0 : _a[0]) === this.entity ? GameMode.adventure : c);
        c = (((_b = Array.from(this.getDimension().getEntities({
            location: ExGameVector3.getLocation(this.entity.location),
            type: MinecraftEntityTypes.player.id,
            closest: 1,
            maxDistance: 1,
            gameMode: GameMode.creative
        }))) === null || _b === void 0 ? void 0 : _b[0]) === this.entity ? GameMode.creative : c);
        c = (((_c = Array.from(this.getDimension().getEntities({
            location: ExGameVector3.getLocation(this.entity.location),
            type: MinecraftEntityTypes.player.id,
            closest: 1,
            maxDistance: 1,
            gameMode: GameMode.spectator
        }))) === null || _c === void 0 ? void 0 : _c[0]) === this.entity ? GameMode.spectator : c);
        c = (((_d = Array.from(this.getDimension().getEntities({
            location: ExGameVector3.getLocation(this.entity.location),
            type: MinecraftEntityTypes.player.id,
            closest: 1,
            maxDistance: 1,
            gameMode: GameMode.survival
        }))) === null || _d === void 0 ? void 0 : _d[0]) === this.entity ? GameMode.survival : c);
        return c;
    }
    title(title, subtitle) {
        // this.runCommandAsync(`titleraw @s title {"rawtext":[{"text":"${title}"}]}`);
        // if (subtitle) this.runCommandAsync(`titleraw @s subtitle {"rawtext":[{"text":"${subtitle}"}]}`);
        this.entity.onScreenDisplay.setTitle(title);
        if (subtitle)
            this.entity.onScreenDisplay.updateSubtitle(subtitle);
    }
    titleActionBar(str) {
        //this.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"${str}"}]}`);
        this.entity.onScreenDisplay.setActionBar(str);
    }
    get selectedSlot() {
        return this.entity.selectedSlot;
    }
    set selectedSlot(value) {
        this.entity.selectedSlot = value;
    }
    constructor(player) {
        super(player);
    }
    getBag() {
        return new ExPlayerBag(this);
    }
    static getInstance(source) {
        let entity = source;
        if (this.propertyNameCache in entity) {
            return entity[this.propertyNameCache];
        }
        return (entity[this.propertyNameCache] = new ExPlayer(entity));
    }
}
//# sourceMappingURL=ExPlayer.js.map