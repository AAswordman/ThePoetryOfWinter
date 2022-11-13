var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ActionFormData } from "@minecraft/server-ui";
import { getEnumFlag, getEnumKeys } from "../../../../../modules/exmc/utils/enumUtil.js";
import Random from "../../../../../modules/exmc/utils/Random.js";
import * as desertCommand from "../../ruins/desert/PomDesertRuinCommmand.js";
import ExGameVector3 from '../../../../../modules/exmc/server/math/ExGameVector3';
export default class PomDesertRuinRules {
    constructor(game) {
        this.collections = [];
        this.game = game;
    }
    clear() {
        this.collections.splice(0, this.collections.length);
    }
    init() {
        this.collections = [...getEnumKeys(desertCommand.MAIN), ...getEnumKeys(desertCommand.EFFECT), ...getEnumKeys(desertCommand.TARGET), ...getEnumKeys(desertCommand.VALUE)];
    }
    randomAddRule() {
        let id = Random.choice(getEnumKeys(Random.choice([desertCommand.EFFECT, desertCommand.MAIN, desertCommand.TARGET, desertCommand.VALUE])));
        this.collections.push(id);
        return id;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            let cmdArr = [];
            outerLoop: for (let loop of [1]) {
                let showCmd = "/ ";
                let mainCmd = desertCommand.MAIN.EXECUTE;
                while (mainCmd === desertCommand.MAIN.EXECUTE) {
                    let action = new ActionFormData()
                        .title("使用规则")
                        .body("规则结构：" + showCmd + "\n当前有：" + this.collections.map(id => this.game.getLang()["ruinDesertCmd_" + id]).join(" , "));
                    let choose = [];
                    for (let i of this.collections) {
                        if (i in desertCommand.MAIN) {
                            choose.push(i);
                        }
                    }
                    if (choose.length === 0)
                        break outerLoop;
                    for (let e of choose) {
                        action.button(this.game.getLang()["ruinDesertCmd_" + e]);
                    }
                    let res = yield action.show(this.game.player);
                    if (res.canceled || res.selection === undefined)
                        break outerLoop;
                    showCmd += this.game.getLang()["ruinDesertCmd_" + choose[res.selection]] + " / ";
                    cmdArr.push(choose[res.selection]);
                    this.collections.splice(this.collections.indexOf(choose[res.selection]), 1);
                    mainCmd = desertCommand.MAIN[choose[res.selection]];
                    console.log(this.collections);
                    action = new ActionFormData()
                        .title("执行坐标")
                        .body("规则结构：" + showCmd + "\n当前有：" + this.collections.map(id => this.game.getLang()["ruinDesertCmd_" + id]).join(" , "));
                    choose = [];
                    for (let i of this.collections) {
                        if (i in desertCommand.TARGET) {
                            choose.push(i);
                        }
                    }
                    if (choose.length === 0)
                        break outerLoop;
                    for (let e of choose) {
                        action.button(this.game.getLang()["ruinDesertCmd_" + e]);
                    }
                    res = yield action.show(this.game.player);
                    if (res.canceled || res.selection === undefined)
                        break outerLoop;
                    showCmd += this.game.getLang()["ruinDesertCmd_" + choose[res.selection]] + " / ";
                    cmdArr.push(choose[res.selection]);
                    this.collections.splice(this.collections.indexOf(choose[res.selection]), 1);
                }
                let action = new ActionFormData()
                    .title("效果/值/倍数")
                    .body("规则结构：" + showCmd + "\n当前有：" + this.collections.map(id => this.game.getLang()["ruinDesertCmd_" + id]).join(" , "));
                let choose = [];
                if (mainCmd === desertCommand.MAIN.EFFECT) {
                    for (let i of this.collections) {
                        if (i in desertCommand.EFFECT) {
                            choose.push(i);
                        }
                    }
                }
                else {
                    for (let i of this.collections) {
                        if (i in desertCommand.VALUE) {
                            choose.push(i);
                        }
                    }
                }
                if (choose.length === 0)
                    break outerLoop;
                for (let e of choose) {
                    action.button(this.game.getLang()["ruinDesertCmd_" + e]);
                }
                let res = yield action.show(this.game.player);
                if (res.canceled || res.selection === undefined)
                    break outerLoop;
                showCmd += this.game.getLang()["ruinDesertCmd_" + choose[res.selection]] + " / ";
                cmdArr.push(choose[res.selection]);
                this.collections.splice(this.collections.indexOf(choose[res.selection]), 1);
                let pos = this.game.exPlayer.getPosition();
                let i = 0;
                mainCmd = desertCommand.MAIN.EXECUTE;
                while (mainCmd === desertCommand.MAIN.EXECUTE) {
                    if (cmdArr[i] in desertCommand.MAIN) {
                        mainCmd = getEnumFlag(desertCommand.MAIN, cmdArr[i]);
                        i += 1;
                    }
                    else {
                        break;
                    }
                    let type = getEnumFlag(desertCommand.TARGET, cmdArr[i]);
                    i += 1;
                    switch (type) {
                        case desertCommand.TARGET.X_ADD_16: {
                            pos.x += 16;
                            break;
                        }
                        case desertCommand.TARGET.X_ADD_32: {
                            pos.x += 32;
                            break;
                        }
                        case desertCommand.TARGET.X_REMOVE_16: {
                            pos.x -= 16;
                            break;
                        }
                        case desertCommand.TARGET.X_REMOVE_32: {
                            pos.x -= 32;
                            break;
                        }
                        case desertCommand.TARGET.Z_ADD_16: {
                            pos.z += 16;
                            break;
                        }
                        case desertCommand.TARGET.Z_ADD_32: {
                            pos.z += 32;
                            break;
                        }
                        case desertCommand.TARGET.Z_REMOVE_16: {
                            pos.z -= 16;
                            break;
                        }
                        case desertCommand.TARGET.Z_REMOVE_32: {
                            pos.z -= 32;
                            break;
                        }
                        case desertCommand.TARGET.Y_ADD_16: {
                            pos.y += 16;
                            break;
                        }
                        case desertCommand.TARGET.Y_ADD_32: {
                            pos.y += 32;
                            break;
                        }
                        case desertCommand.TARGET.Y_REMOVE_16: {
                            pos.y -= 16;
                            break;
                        }
                        case desertCommand.TARGET.Y_REMOVE_32: {
                            pos.y -= 32;
                            break;
                        }
                    }
                }
                let value = getEnumFlag(desertCommand.EFFECT, cmdArr[i]) || getEnumFlag(desertCommand.VALUE, cmdArr[i]);
                let num = 0;
                if (cmdArr[i].startsWith("VALUE_"))
                    num = parseInt(cmdArr[i].split("_")[1]);
                //i+=1;
                switch (mainCmd) {
                    case desertCommand.MAIN.BLAST: {
                        this.game.getExDimension().createExplosion(pos, num, {
                            breaksBlocks: false,
                            source: this.game.player
                        });
                        break;
                    }
                    case desertCommand.MAIN.DAMAGE: {
                        this.game.getExDimension().getEntities({
                            maxDistance: 15,
                            excludeTags: (this.game.player.hasTag("wbmsyh") ? ["wbmsyh"] : []),
                            location: ExGameVector3.getLocation(pos)
                        }).forEach(e => this.game.exPlayer.causeDamageTo(e, num));
                    }
                }
                return;
            }
            this.collections = this.collections.concat(cmdArr);
        });
    }
}
//# sourceMappingURL=PomDesertRuinRules.js.map