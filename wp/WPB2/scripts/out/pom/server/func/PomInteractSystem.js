import ExGameVector3 from "../../../modules/exmc/server/math/ExGameVector3.js";
import GameController from "./GameController.js";
import "../../../modules/exmc/utils/native/Array.js";
import ExEntity from "../../../modules/exmc/server/entity/ExEntity.js";
export default class PomInteractSystem extends GameController {
    onJoin() {
        this.getEvents().exEvents.itemOnHandChange.subscribe(e => {
            var _a, _b;
            if (((_a = e.afterItem) === null || _a === void 0 ? void 0 : _a.typeId) === "epic:machanical_operator" ||
                ((_b = e.afterItem) === null || _b === void 0 ? void 0 : _b.typeId) === "epic:alliance_token") {
                this.listenCannonState = (e) => {
                    if (e.currentTick % 4 === 0) {
                        let arr = this.client.magicSystem.getActionbarByPass("cannon_state");
                        arr === null || arr === void 0 ? void 0 : arr.clear();
                        for (let e of this.getDimension().getEntities({
                            location: ExGameVector3.getLocation(this.player.location),
                            closest: 1,
                            maxDistance: 3,
                            type: "epic:cannon_cart"
                        })) {
                            let entity = ExEntity.getInstance(e);
                            arr === null || arr === void 0 ? void 0 : arr.push("加农炮战车: " + entity.nameTag);
                            if (e.hasTag("wbmsyh")) {
                                arr === null || arr === void 0 ? void 0 : arr.push("    = §a友好模式§f =");
                            }
                            else {
                                arr === null || arr === void 0 ? void 0 : arr.push("    = §4敌对模式§f =");
                            }
                            switch (entity.getVariant()) {
                                case 2:
                                    arr === null || arr === void 0 ? void 0 : arr.push("    攻击模式: §3[护卫]");
                                    break;
                                case 1:
                                    arr === null || arr === void 0 ? void 0 : arr.push("    攻击模式: §6[待命]");
                                    break;
                                case 3:
                                    arr === null || arr === void 0 ? void 0 : arr.push("    攻击模式: §c[破坏]");
                                    break;
                            }
                            switch (entity.getMarkVariant()) {
                                case 1:
                                    arr === null || arr === void 0 ? void 0 : arr.push("    行动模式: §6[待命]");
                                    break;
                                case 2:
                                    arr === null || arr === void 0 ? void 0 : arr.push("    行动模式: §3[跟随]");
                                    break;
                                case 3:
                                    arr === null || arr === void 0 ? void 0 : arr.push("    行动模式: §c[自由]");
                                    break;
                            }
                        }
                    }
                };
                this.getEvents().exEvents.onLongTick.subscribe(this.listenCannonState);
                this.client.magicSystem.registActionbarPass("cannon_state");
            }
            else {
                if (this.listenCannonState) {
                    this.client.magicSystem.deleteActionbarPass("cannon_state");
                    this.getEvents().exEvents.onLongTick.unsubscribe(this.listenCannonState);
                    this.listenCannonState = undefined;
                }
            }
        });
    }
    onLoaded() {
    }
    onLeave() {
    }
}
//# sourceMappingURL=PomInteractSystem.js.map