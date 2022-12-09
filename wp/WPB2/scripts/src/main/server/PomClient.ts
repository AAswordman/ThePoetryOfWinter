import { Player } from "@minecraft/server";
import ExPlayer from "../../modules/exmc/server/entity/ExPlayer.js";
import { Objective } from "../../modules/exmc/server/entity/ExScoresManager.js";
import ExGameClient from "../../modules/exmc/server/ExGameClient.js";
import ExGameServer from "../../modules/exmc/server/ExGameServer.js";
import TagCache from "../../modules/exmc/server/storage/cache/TagCache.js";
import TimeLoopTask from "../../modules/exmc/utils/TimeLoopTask.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import PomData from "./cache/PomData.js";
import lang from "./data/lang.js";
import { langType } from "./data/langType.js";
import GameController from "./func/GameController.js";
import PomEnchantSystem from "./func/PomEnchantSystem.js";
import PomMagicSystem from "./func/PomMagicSystem.js";
import PomTalentSystem from "./func/PomTalentSystem.js";
import SimpleItemUseFunc from "./func/SimpleItemUseFunc.js";
import PomTransmission from '../PomTransmission.js';
import PomDimRuinsSystem from "./func/PomDimRuinsSystem.js";
import PomServer from "./PomServer.js";
import Random from "../../modules/exmc/utils/Random.js";


export default class PomClient extends ExGameClient<PomTransmission> {
    gameControllers: GameController[] = [];
    gameId !: number;
    globalSettings: GlobalSettings;
    cache: TagCache<PomData>;
    data: PomData;
    looper: TimeLoopTask;

    enchantSystem = new PomEnchantSystem(this);
    talentSystem = new PomTalentSystem(this);
    magicSystem = new PomMagicSystem(this);
    itemUseFunc = new SimpleItemUseFunc(this);
    ruinsSystem = new PomDimRuinsSystem(this);


    constructor(server: ExGameServer, id: string, player: Player) {
        super(server, id, player);
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

    override onJoin(): void {
        this.setInterworkingPool({
            setSkyBox: async () => {
                // process in client
            }
        });
    }

    addCtrller(system: GameController) {
        this.gameControllers.push(system);
    }
    getLang(): langType {
        return lang[this.data.lang ?? "en"];
    }

    override onLoaded(): void {
        let scores = ExPlayer.getInstance(this.player).getScoresManager();
        this.gameId = scores.getScore("wbldid");
        if (this.gameId === 0) {
            this.gameId = Math.floor(Math.random() * Random.MAX_VALUE);
            scores.setScoreAsync("wbldid", this.gameId);
        }

        this.gameControllers.forEach(controller => controller.onLoaded());

        if (!this.data.lang) {
            this.exPlayer.runCommandAsync("mojang nmsl").catch((e) => {
                console.warn(JSON.stringify(e)+" catch");
                if ((JSON.stringify(e)).indexOf("未知") !== -1) {
                    this.data.lang = "zh";
                } else {
                    this.data.lang = "en";
                }
            });
        }

        if (this.player.hasTag("wbmsyh")) {
            this.player.nameTag = "§a" + this.player.nameTag;
        } else {
            this.player.nameTag = "§c" + this.player.nameTag;
        }

    }

    override onLeave(): void {
        this.gameControllers.forEach(controller => controller.onLeave());
        this.looper.stop();
        super.onLeave();
    }

    getPlayersAndIds() {
        let arr: [Player, number][] = [];
        for (let i of this.getServer().getClients()) {
            arr.push([i.player, (<PomClient>i).gameId]);
        }
        return arr;
    }

    sayTo(str: string, p = this.player) {
        p.runCommandAsync(`tellraw @s {"rawtext": [{"text": "${str}"}]}`);
    }

    override getServer(): PomServer {
        return <PomServer>super.getServer();
    }
}
