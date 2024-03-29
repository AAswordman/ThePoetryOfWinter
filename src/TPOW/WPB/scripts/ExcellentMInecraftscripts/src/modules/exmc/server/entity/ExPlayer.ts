import { Dimension, EffectType, GameMode } from '@minecraft/server';
import { Player, Entity } from '@minecraft/server';
import ExCommand from '../env/ExCommand.js';
import { to } from "../ExErrorQueue.js";
import ExEntity from "./ExEntity.js";
import ExPlayerBag from './ExPlayerBag.js';
import ExScoresManager from './ExScoresManager.js';
import { IVector2 } from '../../math/Vector2.js';
import Vector3 from '../../math/Vector3.js';
import ExGameConfig from '../ExGameConfig.js';
import ExGame from '../ExGame.js';
import ExSystem from '../../utils/ExSystem.js';


export default class ExPlayer extends ExEntity {

    private bag;
    private scoresManager;

    override get entity() {
        return super.entity as Player;
    }
    override set entity(e: Player) {
        super.entity = e;
    }

    set gamemode(mode: GameMode) {
        switch (mode) {
            case GameMode.survival: this.runCommandAsync(`gamemode 0`); break;
            case GameMode.creative: this.runCommandAsync(`gamemode 1`); break;
            case GameMode.adventure: this.runCommandAsync(`gamemode 2`); break;
            case GameMode.spectator: this.runCommandAsync(`gamemode 3`); break;
        }
    }
    get gamemode(): GameMode {
        let c = [GameMode.adventure, GameMode.creative, GameMode.spectator, GameMode.survival];
        for (let g of c) {
            if (this.entity.matches({
                gameMode: g
            })) {
                return g;
            }
        }
        return GameMode.creative;
    }


    public title(title: string, subtitle?: string) {
        // this.runCommandAsync(`titleraw @s title {"rawtext":[{"text":"${title}"}]}`);
        // if (subtitle) this.runCommandAsync(`titleraw @s subtitle {"rawtext":[{"text":"${subtitle}"}]}`);
        this.entity.onScreenDisplay.setTitle(title);
        if (subtitle) this.entity.onScreenDisplay.updateSubtitle(subtitle);
    }
    public titleActionBar(str: string) {
        //this.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"${str}"}]}`);
        this.entity.onScreenDisplay.setActionBar(str);
    }
    public get selectedSlot() {
        return this.entity.selectedSlot;
    }
    public set selectedSlot(value: number) {
        this.entity.selectedSlot = value;
    }

    override get viewDirection() {
        return super.viewDirection;
    }
    override set viewDirection(ivec: Vector3) {
        this.teleport(this.position, {
            "rotation": {
                x: ivec.rotateAngleX(),
                y: ivec.rotateAngleY()
            }
        })
    }

    override setPosition(position: Vector3, dimension?: Dimension) {
        this.entity.teleport(position, {
            "dimension": dimension
        });
    }
    override get rotation() {
        return super.rotation;
    }
    override set rotation(ivec: IVector2) {
        this.teleport(this.position, {
            "rotation": ivec
        });
    }

    protected constructor(player: Player) {
        super(player);
        this.bag = new ExPlayerBag(this);
        this.scoresManager = super.getScoresManager();
    }

    public override getBag() {
        return this.bag;
    }

    static override getInstance(source: Player): ExPlayer {
        let entity = <any>source;
        if (this.propertyNameCache in entity) {
            // ExGameConfig.console.log("Property id " + (entity as Player).name + "//" + (ExSystem.getId((entity[this.propertyNameCache] as ExPlayer).entity) == ExSystem.getId(entity)))
            // ExGameConfig.console.log("Property == " + (entity[this.propertyNameCache] as ExPlayer).entity == entity)
            // if((entity[this.propertyNameCache] as ExPlayer).entity != entity) (entity[this.propertyNameCache] as ExPlayer).entity = entity;
            return entity[this.propertyNameCache];
        }
        return (entity[this.propertyNameCache] = new ExPlayer(entity));
    }
    static deleteInstance(source: any) {
        delete source[this.propertyNameCache]
    }

    override getScoresManager(): ExScoresManager {
        return this.scoresManager;
    }
}