import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import ExGameConfig from "../../../../../modules/exmc/server/ExGameConfig.js";
import { getEnumFlag, getEnumKeys } from "../../../../../modules/exmc/utils/enumUtil.js";
import Random from "../../../../../modules/exmc/utils/Random.js";
import GameController from "../../GameController.js";

import * as desertCommand from "../../ruins/desert/PomDesertRuinCommmand.js";
import { MinecraftEntityTypes, MinecraftEffectTypes, Player } from '@minecraft/server';
import ExGameVector3 from '../../../../../modules/exmc/server/math/ExGameVector3.js';
import ExEntity from "../../../../../modules/exmc/server/entity/ExEntity.js";
import TickDelayTask from '../../../../../modules/exmc/utils/TickDelayTask.js';
import Vector3 from '../../../../../modules/exmc/math/Vector3.js';

export default class PomDesertRuinRules {
    clear() {
        this.collections.splice(0, this.collections.length);
    }
    collections: string[] = [];
    game: GameController;

    constructor(game: GameController) {
        this.game = game;
    }
    public init() {
        this.collections = [];
        //this.collections = [...getEnumKeys(desertCommand.MAIN), ...getEnumKeys(desertCommand.EFFECT), ...getEnumKeys(desertCommand.TARGET), ...getEnumKeys(desertCommand.VALUE)];
    }
    public randomAddRule() {
        let id = Random.choice(getEnumKeys(Random.choice([desertCommand.EFFECT, desertCommand.MAIN, desertCommand.TARGET, desertCommand.VALUE])));
        this.collections.push(id);
        return id;
    }
    public async show() {
        let cmdArr: string[] = [];
        outerLoop:
        for (let loop of [1]) {

            let showCmd = "/ ";

            let mainCmd = desertCommand.MAIN.EXECUTE;
            while (mainCmd === desertCommand.MAIN.EXECUTE) {
                let action = new ActionFormData()
                    .title("使用规则")
                    .body("规则结构：" + showCmd + "\n当前有：" + this.collections.map(id => (<any>this.game.getLang())["ruinDesertCmd_" + id]).join(" , "));
                let choose: string[] = [];
                for (let i of this.collections) {
                    if (i in desertCommand.MAIN) {
                        choose.push(i);
                    }
                }
                if (choose.length === 0) break outerLoop;
                for (let e of choose) {
                    action.button((<any>this.game.getLang())["ruinDesertCmd_" + e]);
                }
                let res = await action.show(this.game.player);
                if (res.canceled || res.selection === undefined) break outerLoop;
                showCmd += (<any>this.game.getLang())["ruinDesertCmd_" + choose[res.selection]] + " / ";
                cmdArr.push(choose[res.selection]);
                this.collections.splice(this.collections.indexOf(choose[res.selection]), 1);
                mainCmd = (<any>desertCommand.MAIN)[choose[res.selection]];
                console.log(this.collections);
                action = new ActionFormData()
                    .title("执行坐标")
                    .body("规则结构：" + showCmd + "\n当前有：" + this.collections.map(id => (<any>this.game.getLang())["ruinDesertCmd_" + id]).join(" , "));

                choose = [];
                for (let i of this.collections) {
                    if (i in desertCommand.TARGET) {
                        choose.push(i);
                    }
                }
                if (choose.length === 0) break outerLoop;
                for (let e of choose) {
                    action.button((<any>this.game.getLang())["ruinDesertCmd_" + e]);
                }
                res = await action.show(this.game.player);
                if (res.canceled || res.selection === undefined) break outerLoop;
                showCmd += (<any>this.game.getLang())["ruinDesertCmd_" + choose[res.selection]] + " / ";
                cmdArr.push(choose[res.selection]);
                this.collections.splice(this.collections.indexOf(choose[res.selection]), 1);
            }
            let action = new ActionFormData()
                .title("效果/值/倍数")
                .body("规则结构：" + showCmd + "\n当前有：" + this.collections.map(id => (<any>this.game.getLang())["ruinDesertCmd_" + id]).join(" , "));
            let choose: string[] = [];
            if (mainCmd === desertCommand.MAIN.EFFECT) {
                for (let i of this.collections) {
                    if (i in desertCommand.EFFECT) {
                        choose.push(i);
                    }
                }
            } else {
                for (let i of this.collections) {
                    if (i in desertCommand.VALUE) {
                        choose.push(i);
                    }
                }
            }
            if (choose.length === 0) break outerLoop;
            for (let e of choose) {
                action.button((<any>this.game.getLang())["ruinDesertCmd_" + e]);
            }
            let res = await action.show(this.game.player);
            if (res.canceled || res.selection === undefined) break outerLoop;
            showCmd += (<any>this.game.getLang())["ruinDesertCmd_" + choose[res.selection]] + " / ";
            cmdArr.push(choose[res.selection]);
            this.collections.splice(this.collections.indexOf(choose[res.selection]), 1);

            const addPos = new Vector3();
            let i = 0;
            mainCmd = desertCommand.MAIN.EXECUTE;
            while (mainCmd === desertCommand.MAIN.EXECUTE) {
                if (cmdArr[i] in desertCommand.MAIN) {
                    mainCmd = getEnumFlag(desertCommand.MAIN, cmdArr[i]);
                    i += 1;
                } else {
                    break;
                }
                let type = getEnumFlag(desertCommand.TARGET, cmdArr[i]);
                i += 1;
                switch (type) {
                    case desertCommand.TARGET.FACING_ADD_2: {
                        addPos.add(this.game.exPlayer.getViewVector().scl(2));
                        break;
                    }
                    case desertCommand.TARGET.FACING_ADD_4: {
                        addPos.add(this.game.exPlayer.getViewVector().scl(4));
                        break;
                    }
                    case desertCommand.TARGET.FACING_ADD_6: {
                        addPos.add(this.game.exPlayer.getViewVector().scl(6));
                        break;
                    }
                    case desertCommand.TARGET.FACING_ADD_8: {
                        addPos.add(this.game.exPlayer.getViewVector().scl(8));
                        break;
                    }
                    case desertCommand.TARGET.FACING_ADD_10: {
                        addPos.add(this.game.exPlayer.getViewVector().scl(10));
                        break;
                    }
                    case desertCommand.TARGET.FACING_ADD_12: {
                        addPos.add(this.game.exPlayer.getViewVector().scl(12));
                        break;
                    }
                    case desertCommand.TARGET.FACING_ADD_16: {
                        addPos.add(this.game.exPlayer.getViewVector().scl(16));
                        break;
                    }
                    case desertCommand.TARGET.FACING_ADD_32: {
                        addPos.add(this.game.exPlayer.getViewVector().scl(32));
                        break;
                    }
                    case desertCommand.TARGET.FACING_ADD_20: {
                        addPos.add(this.game.exPlayer.getViewVector().scl(20));
                        break;
                    }
                    case desertCommand.TARGET.FACING_ADD_28: {
                        addPos.add(this.game.exPlayer.getViewVector().scl(28));
                        break;
                    }
                    case desertCommand.TARGET.Y_ADD_8: {
                        addPos.y += 8;
                        break;
                    }
                    case desertCommand.TARGET.Y_ADD_4: {
                        addPos.y += 4;
                        break;
                    }
                    case desertCommand.TARGET.Y_ADD_16: {
                        addPos.y += 16;
                        break;
                    }
                    case desertCommand.TARGET.Y_ADD_32: {
                        addPos.y += 32;
                        break;
                    }
                    case desertCommand.TARGET.Y_REMOVE_8: {
                        addPos.y -= 8;
                        break;
                    }
                    case desertCommand.TARGET.Y_REMOVE_4: {
                        addPos.y -= 4;
                        break;
                    }
                    case desertCommand.TARGET.Y_REMOVE_16: {
                        addPos.y -= 16;
                        break;
                    }
                    case desertCommand.TARGET.Y_REMOVE_32: {
                        addPos.y -= 32;
                        break;
                    }
                    
                }
            }
            const value = getEnumFlag(desertCommand.EFFECT, cmdArr[i]) || getEnumFlag(desertCommand.VALUE, cmdArr[i]);
            const num = (cmdArr[i].startsWith("VALUE_")) ? parseInt(cmdArr[i].split("_")[1]) : 0;

            const r =await new ModalFormData().title("其他选项")
            .slider("延迟(s)",0,15,0.5,0)
            .show(this.game.player);

            if(r.canceled || r.formValues === undefined) break outerLoop;
            const delay = r.formValues[0] * 1000;
            const tmpV = new Vector3();
            const skillLoop = new TickDelayTask(this.game.getEvents(),() => {
                tmpV.set(this.game.player.location).add(addPos);
                this.game.getExDimension().spawnParticle("wb:ruin_desert_rulepre",tmpV);
            }).delay(1);
            skillLoop.start();
            //i+=1;
            this.game.setTimeout(()=>{
                skillLoop.stop();
                switch (mainCmd) {
                    case desertCommand.MAIN.BLAST: {
                        this.game.getExDimension().createExplosion(tmpV, num, {
                            breaksBlocks: false,
                            source: this.game.player
                        });
                        break;
                    }
                    case desertCommand.MAIN.DAMAGE: {
                        this.game.getExDimension().getEntities({
                            maxDistance: 15,
                            excludeTags: (this.game.player.hasTag("wbmsyh") ? ["wbmsyh"] : []),
                            location: ExGameVector3.getLocation(tmpV)
                        }).forEach(e => this.game.exPlayer.causeDamageTo(e, num));
                        break;
                    }
                    case desertCommand.MAIN.HEALTH_ADD: {
                        this.game.getExDimension().getEntities({
                            maxDistance: 15,
                            location: ExGameVector3.getLocation(tmpV)
                        }).forEach(e => {
                            let c = ExEntity.getInstance(e).getHealthComponent();
                            c.setCurrent(c.current + num);
                        });
                        break;
                    }
                    case desertCommand.MAIN.HEALTH_REMOVE: {
                        this.game.getExDimension().getEntities({
                            maxDistance: 15,
                            excludeTags: (this.game.player.hasTag("wbmsyh") ? ["wbmsyh"] : []),
                            location: ExGameVector3.getLocation(tmpV)
                        }).forEach(e => {
                            let c = ExEntity.getInstance(e).getHealthComponent();
                            c.setCurrent(Math.max(0,c.current - num));
                        });
                        break;
                    }
                    case desertCommand.MAIN.TP: {
                        this.game.getExDimension().getEntities({
                            maxDistance: 15,
                            location: ExGameVector3.getLocation(tmpV)
                        }).forEach(e => (ExEntity.getInstance(e).setPosition(tmpV.clone().sub(this.game.exPlayer.getPosition()).scl(num/2).add(tmpV))));
                        break;
                    }
                    case desertCommand.MAIN.EFFECT: {
                        let eff = MinecraftEffectTypes.absorption;
                        switch (value) {
                            case desertCommand.EFFECT.WITHER: eff = MinecraftEffectTypes.wither; break;
                            case desertCommand.EFFECT.BLIND: eff = MinecraftEffectTypes.blindness; break;
                            case desertCommand.EFFECT.DEFENSE: eff = MinecraftEffectTypes.resistance; break;
                            case desertCommand.EFFECT.SPEED: eff = MinecraftEffectTypes.speed; break;
                            case desertCommand.EFFECT.STRENGTH: eff = MinecraftEffectTypes.strength; break;
                            case desertCommand.EFFECT.WEAKNESS: eff = MinecraftEffectTypes.weakness; break;
                        }
                        this.game.getExDimension().getEntities({
                            maxDistance: 15,
                            location: ExGameVector3.getLocation(tmpV)
                        }).forEach(e => (e.addEffect(eff, 600, 1, false)));
                        break;
                    }
                }
            },delay);
            return;
        }
        this.collections = this.collections.concat(cmdArr);
    }
}