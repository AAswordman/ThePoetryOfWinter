import { MinecraftEffectTypes, MinecraftBlockTypes } from '@minecraft/server';
import { ModalFormData } from "@minecraft/server-ui";
import Vector3 from '../../../modules/exmc/math/Vector3.js';
import ExDimension from '../../../modules/exmc/server/ExDimension.js';
import ExErrorQueue from '../../../modules/exmc/server/ExErrorQueue.js';
import ExGameVector3 from '../../../modules/exmc/server/math/ExGameVector3.js';
import menuFunctionUI from "../data/menuFunctionUI.js";
import MenuUIAlert from "../ui/MenuUIAlert.js";
import GameController from "./GameController.js";
import ExNPCDialog from '../../../modules/exmc/server/ui/ExNPCDialog.js';
import wb_help from '../ui/npc/wb_help.js';
import wb_plot from '../ui/npc/wb_plot.js';
export default class SimpleItemUseFunc extends GameController {
    onJoin() {
        this.getEvents().exEvents.blockBreak.subscribe(e => {
            var _a;
            if ((e.brokenBlockPermutation.type.id === MinecraftBlockTypes.log.id || e.brokenBlockPermutation.type.id === MinecraftBlockTypes.log2.id) && ((_a = this.exPlayer.getBag().getItemOnHand()) === null || _a === void 0 ? void 0 : _a.typeId) === "wb:axex_equipment_a") {
                this.chainDiggingLogs(new Vector3(e.block), true);
            }
        });
        this.getEvents().exEvents.itemUse.subscribe((e) => {
            const { item } = e;
            if (item.typeId == "wb:power") {
                if (!this.data.lang) {
                    new ModalFormData()
                        .title("Choose a language")
                        .dropdown("Language List", ["English", "简体中文"], 0)
                        .show(this.player).then((e) => {
                        if (!e.canceled) {
                            this.data.lang = (e.formValues && e.formValues[0] == 0) ? "en" : "zh";
                        }
                    })
                        .catch((e) => {
                        ExErrorQueue.throwError(e);
                    });
                }
                else {
                    new MenuUIAlert(this.client, menuFunctionUI(this.getLang())).showPage("main", "notice");
                }
            }
            else if (item.typeId === "wb:jet_pack") {
                // jet pack
                this.player.addEffect(MinecraftEffectTypes.levitation, 7, 15, false);
                this.player.addEffect(MinecraftEffectTypes.slowFalling, 150, 3, false);
                this.exPlayer.getDimension().spawnEntity("wb:ball_jet_pack", ExGameVector3.getBlockLocation(this.exPlayer.getPosition().sub(this.exPlayer.getViewVector().scl(2))));
            }
            else if (item.typeId === "wb:start_key") {
                // start key
                const scores = this.client.exPlayer.getScoresManager();
                const part = scores.getScore("wbnjqbf");
                const chapter = scores.getScore("wbnjqzj");
                const nearBoss = this.player.hasTag("wbnearboss");
                const afterDragon = this.player.hasTag("wbstartkeyok");
                const useDialog_help = new ExNPCDialog(wb_help);
                const useDialog_plot = new ExNPCDialog(wb_plot);
                if (chapter == 0) {
                    switch (part) {
                        case -1: {
                            useDialog_help.show(this.player, "wb_base_help0");
                            break;
                        }
                        case 0: {
                            if (!afterDragon)
                                useDialog_plot.show(this.player, "wb_base_talk000");
                            if (afterDragon)
                                useDialog_plot.show(this.player, "wb_base_talk0");
                            break;
                        }
                        case 1: {
                            useDialog_plot.show(this.player, "wb_base_talk9");
                            break;
                        }
                        case 2: {
                            useDialog_plot.show(this.player, "wb_base_talk13");
                            break;
                        }
                        case 3: {
                            useDialog_plot.show(this.player, "wb_base_talk19");
                            break;
                        }
                        case 4: {
                            useDialog_plot.show(this.player, "wb_base_talk27");
                            break;
                        }
                        case 5: {
                            if (nearBoss)
                                useDialog_plot.show(this.player, "wb_base_talk33");
                            if (!nearBoss)
                                useDialog_plot.show(this.player, "wb_base_talk34");
                            break;
                        }
                        case 6: {
                            useDialog_plot.show(this.player, "wb_base_talk35");
                            break;
                        }
                        case 7: {
                            useDialog_plot.show(this.player, "wb_base_talk37");
                            break;
                        }
                        case 8: {
                            useDialog_plot.show(this.player, "wb_base_talk49");
                            break;
                        }
                        case 9: {
                            if (nearBoss)
                                useDialog_plot.show(this.player, "wb_base_talk57");
                            if (!nearBoss)
                                useDialog_plot.show(this.player, "wb_base_talk58");
                            break;
                        }
                        case 10: {
                            useDialog_plot.show(this.player, "wb_base_talk59");
                            break;
                        }
                        case 11: {
                            useDialog_plot.show(this.player, "wb_base_talk65");
                            break;
                        }
                        case 12: {
                            useDialog_plot.show(this.player, "wb_base_talk72");
                            break;
                        }
                        case 13: {
                            if (nearBoss)
                                useDialog_plot.show(this.player, "wb_base_talk86");
                            if (!nearBoss)
                                useDialog_plot.show(this.player, "wb_base_talk87");
                            break;
                        }
                        case 14: {
                            useDialog_plot.show(this.player, "wb_base_talk88");
                            break;
                        }
                        case 15: {
                            useDialog_plot.show(this.player, "wb_base_talk90");
                            break;
                        }
                        case 16: {
                            if (nearBoss)
                                useDialog_plot.show(this.player, "wb_base_talk101");
                            if (!nearBoss)
                                useDialog_plot.show(this.player, "wb_base_talk102");
                            break;
                        }
                        case 17: {
                            useDialog_plot.show(this.player, "wb_base_talk103");
                            break;
                        }
                        case 18: {
                            useDialog_plot.show(this.player, "wb_base_talk107");
                            break;
                        }
                        case 19: {
                            useDialog_plot.show(this.player, "wb_base_talk112");
                            break;
                        }
                        case 20: {
                            useDialog_plot.show(this.player, "wb_base_talk120");
                            break;
                        }
                    }
                }
            }
        });
    }
    chainDiggingLogs(v, origin) {
        const dim = ExDimension.getInstance(this.getDimension());
        const id = ExDimension.getInstance(this.getDimension()).getBlock(v).typeId;
        if (id === MinecraftBlockTypes.log.id || id === MinecraftBlockTypes.log2.id || origin) {
            dim.digBlock(v);
            this.chainDiggingLogs(v.add(0, 1, 0), false);
            //this.chainDiggingLogs(v.sub(0,1,0).add(1,0,0),false);
            //v.sub(0,1,0);
        }
    }
    onLoaded() {
    }
    onLeave() {
    }
}
//# sourceMappingURL=SimpleItemUseFunc.js.map