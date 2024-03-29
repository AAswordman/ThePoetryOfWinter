import { Player } from "@minecraft/server";
import { receiveMessage } from "../../modules/exmc/server/ExGame.js";
import ExGameClient from "../../modules/exmc/server/ExGameClient.js";
import ExGameServer from "../../modules/exmc/server/ExGameServer.js";
import ExPlayer from "../../modules/exmc/server/entity/ExPlayer.js";
import { Objective } from "../../modules/exmc/server/entity/ExScoresManager.js";
import { eventDecoratorFactory } from "../../modules/exmc/server/events/eventDecoratorFactory.js";
import ExSystem from "../../modules/exmc/utils/ExSystem.js";
import Random from "../../modules/exmc/utils/Random.js";
import PomTransmission from '../PomTransmission.js';
import PomServer from "./PomServer.js";
import GlobalSettings from "./cache/GlobalSettings.js";
import PomClientData from "./cache/PomClientData.js";
import POMLICENSE from "./data/POMLICENSE.js";
import lang from "./data/lang.js";
import { langType } from "./data/langType.js";
import GameController from "./func/GameController.js";
import PomDimRuinsSystem from "./func/PomDimRuinsSystem.js";
import PomEnchantSystem from "./func/PomEnchantSystem.js";
import PomInteractSystem from "./func/PomInteractSystem.js";
import PomMagicSystem from "./func/PomMagicSystem.js";
import PomTalentSystem from "./func/PomTalentSystem.js";
import PomTaskSystem from "./func/PomTaskSystem.js";
import SimpleItemUseFunc from "./func/SimpleItemUseFunc.js";
import WarningAlertUI from "./ui/WarningAlertUI.js";
import TickDelayTask from "../../modules/exmc/utils/TickDelayTask.js";
import ExPropCache from "../../modules/exmc/server/storage/cache/ExPropCache.js";
import { ArmorData } from "../../dec/server/items/ArmorData.js";
import { GameDifficulty, pomDifficultyMap } from "./data/GameDifficulty.js";
import Vector3 from "../../modules/exmc/math/Vector3.js";
import TalentData from "./cache/TalentData.js";
import PomTerritorySystem from "./func/PomTerritorySystem.js";



export default class PomClient extends ExGameClient<PomTransmission> {
    gameControllers: GameController[] = [];
    gameId !: number;
    globalSettings: GlobalSettings;
    cache: ExPropCache<PomClientData>;
    data: PomClientData;
    looper: TickDelayTask;

    enchantSystem = new PomEnchantSystem(this);
    talentSystem = new PomTalentSystem(this);
    magicSystem = new PomMagicSystem(this);
    itemUseFunc = new SimpleItemUseFunc(this);
    ruinsSystem = new PomDimRuinsSystem(this);
    taskSystem = new PomTaskSystem(this);
    interactSystem = new PomInteractSystem(this);
    territorySystem = new PomTerritorySystem(this);
    licenseLooper?: TickDelayTask;
    // net;

    constructor(server: ExGameServer, id: string, player: Player) {
        super(server, id, player);
        this.globalSettings = new GlobalSettings(new Objective("wpsetting"));
        this.cache = new ExPropCache(this.getDynamicPropertyManager());
        this.looper = ExSystem.tickTask(() => {
            this.cache.save();
        });
        this.looper.delay(10 * 20);
        this.looper.start();
        this.data = this.cache.get(new PomClientData());

        if (!this.globalSettings.ownerExists) {
            player.addTag("owner");
            this.globalSettings.ownerExists = true;
        }
        this.addCtrller(this.enchantSystem);
        this.addCtrller(this.magicSystem);
        this.addCtrller(this.talentSystem);
        this.addCtrller(this.itemUseFunc);
        this.addCtrller(this.ruinsSystem);
        this.addCtrller(this.taskSystem);
        this.addCtrller(this.interactSystem);
        this.addCtrller(this.territorySystem);

        if (!this.data.pointRecord) {
            this.data.pointRecord = {
                deathPoint: <[string, Vector3][]>[],
                point: <[string, string, Vector3][]>[]
            };
        }
        if (!this.data.talent) this.data.talent = new TalentData();
        if (!this.data.tasks) {
            this.data.tasks = {
                daily: {
                    complete: [[], [], [], []],
                    all: [[], [], [], []],
                    date: "1970-2-31",
                    cache: {}
                },
                progress: {
                    complete: [],
                    data: {}
                }
            }
        }
        if (!this.data.socialList) {
            this.data.socialList = {
                refuseList: [],
                acceptList: []
            }
        }
        if (!this.data.territory) {
            this.data.territory = {
                data: [

                ]
            }
        }
        if(!this.data.redemptionCode){
            this.data.redemptionCode = {};
        }
        if (!this.data.uiCustomSetting) {
            this.data.uiCustomSetting = {
                topLeftMessageBarStyle: 0,
                topLeftMessageBarLayer1: 100,
                topLeftMessageBarLayer2: 100,
                topLeftMessageBarLayer3: 100,
                topLeftMessageBarLayer4: 100,
                topLeftMessageBarLayer5: 100,
            }
        }
        if (!this.data.gamePreferrence) {
            this.data.gamePreferrence = {
                chainMining: true
            }
        }
        this.gameControllers.forEach(controller => {
            eventDecoratorFactory(this.getEvents(), controller);
            controller.onJoin();
        });
        // this.net = new NeuralNetwork<{a:number,b:number},{c:number}>();
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

    override onLoad(): void {
        let scores = ExPlayer.getInstance(this.player).getScoresManager();
        this.gameId = scores.getScore("wbldid");
        if (this.gameId === 0) {
            this.gameId = Math.floor(Math.random() * Random.MAX_VALUE);
            scores.setScore("wbldid", this.gameId);
        }

        if(this.data.socialList.acceptList.filter(e => e[0] === this.gameId).length === 0){
            this.data.socialList.acceptList.push([this.gameId, this.playerName])
        }
        this.territorySystem.updateGlobalList();

        this.gameControllers.forEach(controller => controller.onLoad());

        if (!this.data.lang) {
            this.exPlayer.runCommandAsync("mojang nmsl").catch((e) => {
                if (ExSystem.hasChineseCharacter(JSON.stringify(e))) {
                    this.data.lang = "zh";
                } else {
                    this.data.lang = "en";
                }
            });
        }
        if (!this.data.licenseRead) {
            this.licenseLooper = ExSystem.tickTask(() => {
                new WarningAlertUI(this, POMLICENSE, [["同意并继续", (c, ui) => {
                    this.data.licenseRead = true;
                    this.licenseLooper?.stop();
                }]]).showPage();
                if (this.data.licenseRead) this.licenseLooper?.stop();
            }).delay(2 * 20);
            this.licenseLooper.start();
        }

        if (this.player.hasTag("wbmsyh")) {
            this.player.nameTag = "§a" + this.player.nameTag;
        } else {
            this.player.nameTag = "§c" + this.player.nameTag;
        }

        this.exPlayer.command.run([
            "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbef 0",
            "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbdj 0",
            "execute as @s[tag=!wbyzc] at @s run give @s wb:power 1 0 {\"minecraft:keep_on_death\":{}}",
            "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbcsjs -1",
            "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbnldx 0",
            //wbldid
            "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbldpd 0",
            "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbldcg 0",
            "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbfl 200",
            "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbwqlq 0",
            "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbkjlqcg 0",
            "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbkjlqjs 0",
            "execute as @s[tag=!wbyzc] at @s run scoreboard players set @s wbwqlqjs 100",
            "tag @s[scores={wbdj=-100..}] add wbyzc",
        ]
        );
    }

    override onLeave(): void {
        this.gameControllers.forEach(controller => controller.onLeave());
        this.looper.stop();
        this.licenseLooper?.stop();
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

    getGlobalData() {
        return this.getServer().data;
    }

    getDifficulty(): GameDifficulty {
        return (pomDifficultyMap).get(this.globalSettings.gameDifficulty + "")!;
    }


    @receiveMessage("taskUi")
    taskUI(page?: string, subpage?: string): void {
        this.taskSystem.show(page, subpage);
    }
    @receiveMessage("progressTaskFinish")
    progressTaskFinish(name: string, damage: number): void {
        this.taskSystem.progressTaskFinish(name, damage);
    }
    @receiveMessage("chooseArmor")
    chooseArmor(a: ArmorData) {
        this.talentSystem.chooseArmor(a);
    }
}
