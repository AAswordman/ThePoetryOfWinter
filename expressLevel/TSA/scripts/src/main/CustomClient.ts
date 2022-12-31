import { Player, MinecraftItemTypes, MinecraftBlockTypes, world } from '@minecraft/server';
import Vector2 from "../modules/exmc/math/Vector2.js";
import Vector3 from "../modules/exmc/math/Vector3.js";
import ExStructureJigsaw from "../modules/exmc/server/block/structure/ExStructureJigsaw.js";
import ExGameClient from "../modules/exmc/server/ExGameClient.js";
import ExGameServer from "../modules/exmc/server/ExGameServer.js";
import Random from "../modules/exmc/utils/Random.js";
import ExActionAlert from "../modules/exmc/server/ui/ExActionAlert.js";


export default class CustomClient extends ExGameClient {
    expressLevel: number = 0;

    constructor(server: ExGameServer, id: string, player: Player) {
        super(server, id, player);
    }

    override onJoin(): void {
        super.onJoin();

        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            if (e.item.typeId === MinecraftItemTypes.stick.id && this.getExDimension().getBlock(e.blockLocation).typeId === MinecraftBlockTypes.obsidian.id) {
                new ExActionAlert().title("你的表达能力是？").body("请选择")
                    .button("1", () => this.expressLevel = 1)
                    .button("2", () => this.expressLevel = 2)
                    .button("3", () => this.expressLevel = 3)
                    .button("4", () => this.expressLevel = 4)
                    .button("5", () => this.expressLevel = 5)
                    .show(this.player);
            }
        });

        this.getEvents().exEvents.beforeChat.subscribe((e) => {
            let p = (0.2 * this.expressLevel);
            if (!e.message.startsWith("/")) {
                world.say("<" + this.playerName + "> " + e.message.split('').map(
                    e => (Math.random() > p) ? (Random.choice("^%$*#@!?".split(''))) : (e)
                ).join(""));
                e.cancel = true;
            }
        });
    }

    override onLoaded(): void {

    }

    override onLeave(): void {

    }
}