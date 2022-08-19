import ExGameClient from "../modules/exmc/ExGameClient.js";
import ExPlayer from "../modules/exmc/entity/ExPlayer.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import { Objective } from "../modules/exmc/entity/ExScoresManager.js";
import TagCache from "../modules/exmc/storage/cache/TagCache.js";
import PomData from "./cache/PomData.js";
import TimeLoopTask from "../modules/exmc/utils/TimeLoopTask.js";
import lang from "./data/lang.js";
import PomEnchantSystem from "./func/PomEnchantSystem.js";
import PomTalentSystem from "./func/PomTalentSystem.js";
import PomMagicSystem from "./func/PomMagicSystem.js";
import SimpleItemUseFunc from "./func/SimpleItemUseFunc.js";
export default class PomClient extends ExGameClient {
    constructor(server, id, player) {
        super(server, id, player);
        this.gameControllers = [];
        this.enchantSystem = new PomEnchantSystem(this);
        this.talentSystem = new PomTalentSystem(this);
        this.magicSystem = new PomMagicSystem(this);
        this.itemUseFunc = new SimpleItemUseFunc(this);
        this.globalSettings = new GlobalSettings(new Objective("wpsetting"));
        this.cache = new TagCache(this.exPlayer);
        this.looper = new TimeLoopTask(this.getEvents(), () => {
            this.cache.save();
        });
        this.looper.delay(10000);
        this.looper.start();
        this.data = this.cache.get(new PomData());
        this.addCtrller(this.enchantSystem);
        this.addCtrller(this.magicSystem);
        this.addCtrller(this.talentSystem);
        this.addCtrller(this.itemUseFunc);
        this.gameControllers.forEach(controller => controller.onJoin());
    }
    addCtrller(system) {
        this.gameControllers.push(system);
    }
    getLang() {
        var _a;
        return lang[(_a = this.data.lang) !== null && _a !== void 0 ? _a : "en"];
    }
    onLoaded() {
        this.gameId = ExPlayer.getInstance(this.player).getScoresManager().getScore("wbldid");
        this.gameControllers.forEach(controller => controller.onLoaded());
        if (this.player.hasTag("wbmsyh")) {
            this.player.nameTag = "§a" + this.player.nameTag;
        }
        else {
            this.player.nameTag = "§c" + this.player.nameTag;
        }
    }
    onLeave() {
        this.gameControllers.forEach(controller => controller.onLeave());
        this.looper.stop();
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