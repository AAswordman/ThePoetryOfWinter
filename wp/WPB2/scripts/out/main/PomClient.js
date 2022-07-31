import ExGameClient from "../modules/exmc/ExGameClient.js";
import MenuUIAlert from "./ui/MenuUIAlert.js";
import menuFunctionUI from "./data/menuFunctionUI.js";
import ExPlayer from "../modules/exmc/entity/ExPlayer.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import { Objective } from "../modules/exmc/entity/ExScoresManager.js";
import ExGameConfig from '../modules/exmc/ExGameConfig.js';
import TagCache from "../modules/exmc/storage/cache/TagCache.js";
import PomData from "./cache/PomData.js";
import TimeLoopTask from "../modules/exmc/utils/TimeLoopTask.js";
export default class PomClient extends ExGameClient {
    constructor(server, id, player) {
        super(server, id, player);
        this.globalSettings = new GlobalSettings(new Objective("wpsetting"));
        if (ExGameConfig.debug) {
            this.globalSettings.debug();
        }
        this.cache = new TagCache(this.exPlayer);
        this.looper = new TimeLoopTask(this, () => {
            this.cache.save();
        });
        this.looper.delay(10000);
        this.looper.start();
        this.data = this.cache.get(new PomData());
        this.register();
    }
    register() {
        this.getEvents().exEvents.itemUse.subscribe((e) => {
            const { item } = e;
            if (item.id == "wb:power") {
                new MenuUIAlert(this, menuFunctionUI).showPage(["main", "notice"]);
            }
        });
        this.getEvents().exEvents.playerHitEntity.subscribe((e) => {
            ExGameConfig.console.info("hit" + e.damage);
        });
        this.getEvents().exEvents.playerHurt.subscribe((e) => {
            var _a;
            let beforeHealth = (_a = this.exPlayer["nowHealth"]) !== null && _a !== void 0 ? _a : this.exPlayer.getMaxHealth();
            let realDamage = Math.max(0, beforeHealth - this.exPlayer.getHealth());
            ExGameConfig.console.info("hurt by" + e.damage + " health:");
            this.exPlayer["nowHealth"] = this.exPlayer.getHealth();
        });
        new TimeLoopTask(this, () => {
            ExGameConfig.console.info("health:" + this.exPlayer.getHealth());
        }).delay(0).start();
        this.getEvents().exEvents.itemOnHandChange.subscribe((e) => {
            var _a, _b;
            ExGameConfig.console.info("onHandChange:" + ((_a = e.beforeItem) === null || _a === void 0 ? void 0 : _a.id) + " -> " + ((_b = e.afterItem) === null || _b === void 0 ? void 0 : _b.id));
        });
    }
    onLoaded() {
        this.gameId = ExPlayer.getInstance(this.player).getScoresManager().getScore("wbldid");
        if (this.player.hasTag("wbmsyh")) {
            this.player.nameTag = "§a" + this.player.nameTag;
        }
        else {
            this.player.nameTag = "§c" + this.player.nameTag;
        }
    }
    onLeave() {
        this.looper.stop();
        this.cache.save();
        super.onLeave();
    }
    getPlayersAndIds() {
        return this.runOnServer((server) => {
            let arr = [];
            for (let i of server.getClients()) {
                arr.push([i.player, i.gameId]);
            }
            return arr;
        });
    }
    sayTo(str, p = this.player) {
        p.runCommand(`tellraw @s {"rawtext": [{"text": "${str}"}]}`);
    }
}
//# sourceMappingURL=PomClient.js.map