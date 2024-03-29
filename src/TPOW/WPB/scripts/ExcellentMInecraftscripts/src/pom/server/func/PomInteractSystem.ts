import GameController from "./GameController.js";
import "../../../modules/exmc/utils/native/Array.js";
import ExEntity from "../../../modules/exmc/server/entity/ExEntity.js";
import { TickEvent } from "../../../modules/exmc/server/events/events.js";

export default class PomInteractSystem extends GameController {
    listenCannonState?: { (e: TickEvent): void; };

    onJoin(): void {
        this.getEvents().exEvents.afterItemOnHandChange.subscribe(e => {
            if (
                e.afterItem?.typeId === "epic:machanical_operator" ||
                e.afterItem?.typeId === "epic:alliance_token"
            ) {
                this.listenCannonState = (e: TickEvent) => {
                    if (e.currentTick % 4 === 0) {
                        let arr = this.client.magicSystem.getActionbarByPass("cannon_state");
                        arr?.clear();

                        for (let e of this.getDimension().getEntities({
                            location: this.player.location,
                            closest: 1,
                            maxDistance: 3,
                            type: "epic:cannon_cart"
                        })) {
                            let entity = ExEntity.getInstance(e);

                            arr?.push("加农炮战车: "+entity.nameTag);
                            if (e.hasTag("wbmsyh")) {
                                arr?.push("    = §a友好模式§f =")
                            } else {
                                arr?.push("    = §4敌对模式§f =")
                            }
                            switch (entity.getVariant()) {
                                case 2: arr?.push("    攻击模式: §3[护卫]"); break;
                                case 1: arr?.push("    攻击模式: §6[待命]"); break;
                                case 3: arr?.push("    攻击模式: §c[破坏]"); break;
                            }
                            switch (entity.getMarkVariant()) {
                                case 1: arr?.push("    行动模式: §6[待命]"); break;
                                case 2: arr?.push("    行动模式: §3[跟随]"); break;
                                case 3: arr?.push("    行动模式: §c[自由]"); break;
                            }

                        }
                    }
                }
                this.getEvents().exEvents.onLongTick.subscribe(this.listenCannonState);
                this.client.magicSystem.registActionbarPass("cannon_state");
            } else {
                if (this.listenCannonState) {
                    this.client.magicSystem.deleteActionbarPass("cannon_state");
                    this.getEvents().exEvents.onLongTick.unsubscribe(this.listenCannonState);
                    this.listenCannonState = undefined;
                }
            }
        });
    }

    onLoad(): void {

    }

    onLeave(): void {

    }

}