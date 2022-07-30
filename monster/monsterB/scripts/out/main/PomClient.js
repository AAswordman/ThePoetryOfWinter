import ExGameClient from "../modules/exmc/ExGameClient.js";
import { MinecraftItemTypes } from 'mojang-minecraft';
import MenuUIAlert from "./ui/MenuUIAlert.js";
import menuFunctionUI from "./data/menuFunctionUI.js";
export default class PomClient extends ExGameClient {
    constructor(server, id, player) {
        super(server, id, player);
        this.register();
    }
    register() {
        this.getEvents().exEvents.itemUse.subscribe((e) => {
            const { item } = e;
            if (item.id == MinecraftItemTypes.bread.id) {
                new MenuUIAlert(this, menuFunctionUI).showPage(["main", "notice"]);
            }
        });
    }
}
//# sourceMappingURL=PomClient.js.map