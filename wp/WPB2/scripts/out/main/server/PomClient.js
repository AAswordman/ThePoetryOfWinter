var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ExPlayer from "../../modules/exmc/server/entity/ExPlayer.js";
import { Objective } from "../../modules/exmc/server/entity/ExScoresManager.js";
import ExGameClient from "../../modules/exmc/server/ExGameClient.js";
import TagCache from "../../modules/exmc/server/storage/cache/TagCache.js";
import TimeLoopTask from "../../modules/exmc/utils/TimeLoopTask.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import PomData from "./cache/PomData.js";
import lang from "./data/lang.js";
import PomEnchantSystem from "./func/PomEnchantSystem.js";
import PomMagicSystem from "./func/PomMagicSystem.js";
import PomTalentSystem from "./func/PomTalentSystem.js";
import SimpleItemUseFunc from "./func/SimpleItemUseFunc.js";
import PomDimRuinsSystem from "./func/PomDimRuinsSystem.js";
import Random from "../../modules/exmc/utils/Random.js";
export default class PomClient extends ExGameClient {
    constructor(server, id, player) {
        super(server, id, player);
        this.gameControllers = [];
        this.enchantSystem = new PomEnchantSystem(this);
        this.talentSystem = new PomTalentSystem(this);
        this.magicSystem = new PomMagicSystem(this);
        this.itemUseFunc = new SimpleItemUseFunc(this);
        this.ruinsSystem = new PomDimRuinsSystem(this);
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
        this.addCtrller(this.ruinsSystem);
        this.gameControllers.forEach(controller => controller.onJoin());
        if (!this.globalSettings.ownerExists) {
            player.addTag("owner");
            this.globalSettings.ownerExists = true;
        }
    }
    onJoin() {
        this.setInterworkingPool({
            setSkyBox: () => __awaiter(this, void 0, void 0, function* () {
                // process in client
            })
        });
    }
    addCtrller(system) {
        this.gameControllers.push(system);
    }
    getLang() {
        var _a;
        return lang[(_a = this.data.lang) !== null && _a !== void 0 ? _a : "en"];
    }
    onLoaded() {
        let scores = ExPlayer.getInstance(this.player).getScoresManager();
        this.gameId = scores.getScore("wbldid");
        if (this.gameId === 0) {
            this.gameId = Math.floor(Math.random() * Random.MAX_VALUE);
            scores.setScore("wbldid", this.gameId);
        }
        this.gameControllers.forEach(controller => controller.onLoaded());
        if (!this.data.lang) {
            try {
                this.player.runCommand("mojang nmsl");
            }
            catch (e) {
                if ((JSON.stringify(e)).indexOf("未知") !== -1) {
                    this.data.lang = "zh";
                }
                else {
                    this.data.lang = "en";
                }
            }
        }
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
        let arr = [];
        for (let i of this.getServer().getClients()) {
            arr.push([i.player, i.gameId]);
        }
        return arr;
    }
    sayTo(str, p = this.player) {
        p.runCommand(`tellraw @s {"rawtext": [{"text": "${str}"}]}`);
    }
    getServer() {
        return super.getServer();
    }
}
//# sourceMappingURL=PomClient.js.map