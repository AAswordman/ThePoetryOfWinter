import { MinecraftEffectTypes } from "mojang-minecraft";
import { ModalFormData } from "mojang-minecraft-ui";
import ExErrorStack from "../../modules/exmc/ExErrorStack.js";
import menuFunctionUI from "../data/menuFunctionUI.js";
import MenuUIAlert from "../ui/MenuUIAlert.js";
import GameController from "./GameController.js";
export default class SimpleItemUseFunc extends GameController {
    onJoin() {
        this.getEvents().exEvents.itemUse.subscribe((e) => {
            const { item } = e;
            if (item.id == "wb:power") {
                if (!this.data.lang) {
                    new ModalFormData()
                        .title("Choose a language")
                        .dropdown("Language List", ["English", "简体中文"], 0)
                        .show(this.player).then((e) => {
                        if (!e.isCanceled) {
                            this.data.lang = e.formValues[0] == 0 ? "en" : "zh";
                        }
                    })
                        .catch((e) => {
                        ExErrorStack.throwError(e);
                    });
                }
                else {
                    new MenuUIAlert(this.client, menuFunctionUI(this.getLang())).showPage(["main", "notice"]);
                }
            }
        });
        // jet pack
        this.getEvents().exEvents.itemUse.subscribe(e => {
            if (e.item.id === "wb:jet_pack") {
                this.player.addEffect(MinecraftEffectTypes.levitation, 7, 15, false);
                this.player.addEffect(MinecraftEffectTypes.slowFalling, 150, 3, false);
                this.player.dimension.spawnEntity("wb:ball_jet_pack", this.exPlayer.getPosition().sub(this.exPlayer.getViewVector().scl(2)).getLocation());
            }
        });
    }
    onLoaded() {
    }
    onLeave() {
    }
}
//# sourceMappingURL=SimpleItemUseFunc.js.map