import { MinecraftBlockTypes, MinecraftDimensionTypes } from '@minecraft/server';
import GameController from "./GameController.js";
import RuinsLoaction from "./ruins/RuinsLoaction.js";
import { ExBlockArea } from '../../../modules/exmc/server/block/ExBlockArea.js';
import Vector3 from '../../../modules/exmc/math/Vector3.js';
import ExGameVector3 from '../../../modules/exmc/server/math/ExGameVector3.js';
import PomDesertRuinBasicRule from './ruins/desert/PomDesertRuinBasicRule.js';
import VarOnChangeListener from '../../../modules/exmc/utils/VarOnChangeListener.js';
import ExMessageAlert from '../../../modules/exmc/server/ui/ExMessageAlert.js';
import ExActionAlert from '../../../modules/exmc/server/ui/ExActionAlert.js';
import PomBossBarrier from './barrier/PomBossBarrier.js';
import { Objective } from '../../../modules/exmc/server/entity/ExScoresManager.js';
export default class PomDimRuinsSystem extends GameController {
    constructor() {
        super(...arguments);
        this.i_inviolable = new Objective("i_inviolable");
        this.i_damp = new Objective("i_damp");
        this.i_soft = new Objective("i_soft");
        this.desertRuinRules = new PomDesertRuinBasicRule(this);
        this.isInRuinJudge = false;
        this.causeDamage = 0;
        this.deathTimes = 0;
        this._causeDamageShow = false;
        this.causeDamageType = new Set();
        this.causeDamageListenner = new VarOnChangeListener((n, last) => {
            if (n) {
                this.causeDamageMonitor = this.client.talentSystem.hasCauseDamage.addMonitor((d, e) => {
                    if (this.causeDamageType.has(e.typeId)) {
                        this.causeDamage += d;
                    }
                });
                this.deathTimesListener = (e) => {
                    var _a;
                    // console.warn("add");
                    // console.warn(this.exPlayer.getHealth());
                    if (this.exPlayer.getHealth() <= 0) {
                        (_a = this.barrier) === null || _a === void 0 ? void 0 : _a.notifyDeathAdd();
                    }
                };
                this.getEvents().exEvents.playerHurt.subscribe(this.deathTimesListener);
            }
            else {
                if (this.causeDamageMonitor) {
                    this.client.talentSystem.hasCauseDamage.removeMonitor(this.causeDamageMonitor);
                    this.causeDamageMonitor = undefined;
                    this.client.magicSystem.anotherShow = [];
                }
                if (this.deathTimesListener) {
                    this.getEvents().exEvents.playerHurt.unsubscribe(this.deathTimesListener);
                    this.deathTimesListener = undefined;
                }
                this.deathTimes = 0;
                this.causeDamage = 0;
                this.causeDamageType.clear();
            }
        }, false);
        this.desertRuinBackJudge = new VarOnChangeListener((v) => {
            if (v) {
                new ExMessageAlert().title("返回").body("是否返回主世界?")
                    .button1("否", () => {
                })
                    .button2("是", () => {
                    let v = this.data.dimBackPoint;
                    if (!v) {
                        v = new Vector3(0, 255, 0);
                    }
                    this.exPlayer.setPosition(v, this.getDimension(MinecraftDimensionTypes.overworld));
                })
                    .show(this.player);
            }
        }, false);
        this.stoneRuinBackJudge = new VarOnChangeListener((v) => {
            if (v) {
                new ExActionAlert().title("操作").body("选择你的操作")
                    .button("召唤boss", () => {
                    this.getExDimension().spawnEntity("wb:magic_stoneman", this.client.getServer().ruin_stoneBoss.getBossSpawnArea().center());
                })
                    .button("返回主世界", () => {
                    let v = this.data.dimBackPoint;
                    if (!v) {
                        v = new Vector3(0, 255, 0);
                    }
                    this.exPlayer.setPosition(v, this.getDimension(MinecraftDimensionTypes.overworld));
                })
                    .button("取消", () => {
                })
                    .show(this.player);
            }
        }, false);
    }
    get causeDamageShow() {
        return this._causeDamageShow;
    }
    set causeDamageShow(value) {
        this._causeDamageShow = value;
        this.causeDamageListenner.upDate(value);
    }
    onJoin() {
        const tmpV = new Vector3();
        const tmpA = new Vector3();
        const tmpB = new Vector3();
        this.getEvents().exEvents.onLongTick.subscribe(event => {
            var _a, _b, _c, _d;
            if (event.currentTick % 4 !== 0)
                return;
            //1s 1 tick
            //脚下方块探测
            tmpV.set(this.player.location);
            let loc = ExGameVector3.getBlockLocation(tmpV);
            loc.y -= 1;
            let block;
            try {
                block = this.getDimension().getBlock(loc);
            }
            catch (e) { }
            if ((block === null || block === void 0 ? void 0 : block.typeId) === "wb:portal_desertboss") {
                //守卫遗迹判断
                this.data.dimBackPoint = new Vector3(this.player.location).add(3, 2, 3);
                this.client.cache.save();
                this.exPlayer.setPosition(ExBlockArea.randomPoint(this.client.getServer().ruin_desertBoss.getPlayerSpawnArea(), 4), this.getDimension(MinecraftDimensionTypes.theEnd));
                //未生成遗迹判断
                if (((this.globalSettings.ruinsExsitsData >> RuinsLoaction.DESERT_RUIN_NUM) & 1) == 0) {
                    //generate
                    this.client.getServer().ruin_desertBoss.generate();
                    this.globalSettings.ruinsExsitsData = this.globalSettings.ruinsExsitsData | (1 << (RuinsLoaction.DESERT_RUIN_NUM));
                }
            }
            else if ((block === null || block === void 0 ? void 0 : block.typeId) === "wb:portal_stoneboss") {
                //石头遗迹判断
                this.data.dimBackPoint = new Vector3(this.player.location).add(3, 2, 3);
                this.client.cache.save();
                this.exPlayer.setPosition(ExBlockArea.randomPoint(this.client.getServer().ruin_stoneBoss.getPlayerSpawnArea(), 1), this.getDimension(MinecraftDimensionTypes.theEnd));
                //未生成遗迹判断
                if (((this.globalSettings.ruinsExsitsData >> RuinsLoaction.STONE_RUIN_NUM) & 1) == 0) {
                    //generate
                    this.client.getServer().ruin_stoneBoss.generate();
                    this.globalSettings.ruinsExsitsData = this.globalSettings.ruinsExsitsData | (1 << (RuinsLoaction.STONE_RUIN_NUM));
                }
            }
            //所有遗迹返回判断
            if (!PomBossBarrier.isInBarrier(this.player)) {
                this.desertRuinBackJudge.upDate(((_b = (_a = this.client.getServer().ruin_desertBoss.getBossSpawnArea()) === null || _a === void 0 ? void 0 : _a.contains(tmpV)) !== null && _b !== void 0 ? _b : false)
                    && this.player.dimension.id === MinecraftDimensionTypes.theEnd);
                this.stoneRuinBackJudge.upDate(((_d = (_c = this.client.getServer().ruin_stoneBoss.getBossSpawnArea()) === null || _c === void 0 ? void 0 : _c.contains(tmpV)) !== null && _d !== void 0 ? _d : false)
                    && this.player.dimension.id === MinecraftDimensionTypes.theEnd);
            }
            let isInGuardRuin = false;
            let isInStoneRuin = false;
            //处于守卫遗迹
            if (this.getDimension(MinecraftDimensionTypes.theEnd) === this.player.dimension
                && tmpV.x >= RuinsLoaction.DESERT_RUIN_LOCATION_START.x && tmpV.x <= RuinsLoaction.DESERT_RUIN_LOCATION_END.x
                && tmpV.z >= RuinsLoaction.DESERT_RUIN_LOCATION_START.z && tmpV.z <= RuinsLoaction.DESERT_RUIN_LOCATION_END.z) {
                if (tmpV.y < RuinsLoaction.DESERT_RUIN_LOCATION_START.y - 2) {
                    tmpV.y = RuinsLoaction.DESERT_RUIN_LOCATION_START.y + 4;
                    this.exPlayer.setPosition(tmpV);
                }
                if (3 <= tmpV.x % 16 && tmpV.x % 16 <= 13 && 3 <= tmpV.z % 16 && tmpV.z % 16 <= 13)
                    this.desertRuinRules.desertRuinScoreJudge.upDate(`${Math.floor((tmpV.x - RuinsLoaction.DESERT_RUIN_LOCATION_START.x) / 16)},${Math.floor((tmpV.y - RuinsLoaction.DESERT_RUIN_LOCATION_START.y) / 16)},${Math.floor((tmpV.z - RuinsLoaction.DESERT_RUIN_LOCATION_START.z) / 16)}`);
                isInGuardRuin = true;
                let show = [];
                show = this.desertRuinRules.getShowMap();
                this.client.magicSystem.anotherShow = show;
            }
            this.desertRuinRules.inRuinsListener.upDate(isInGuardRuin);
            //处于石头遗迹
            if (this.getDimension(MinecraftDimensionTypes.theEnd) === this.player.dimension
                && tmpV.x >= RuinsLoaction.STONE_RUIN_LOCATION_START.x && tmpV.x <= RuinsLoaction.STONE_RUIN_LOCATION_END.x
                && tmpV.z >= RuinsLoaction.STONE_RUIN_LOCATION_START.z && tmpV.z <= RuinsLoaction.STONE_RUIN_LOCATION_END.z) {
                if (tmpV.y < RuinsLoaction.STONE_RUIN_LOCATION_START.y - 2) {
                    tmpV.y = RuinsLoaction.STONE_RUIN_LOCATION_START.y + 6;
                    this.exPlayer.setPosition(tmpV);
                }
                isInStoneRuin = true;
                this.exPlayer.command.run(`fog @s push wb:ruin_stone_boss "ruin_fog"`);
            }
            if (this.causeDamageShow) {
                let show = [];
                show.push(`玩家死亡: ${this.deathTimes} 次`);
                show.push(`造成伤害: ${this.causeDamage} 点`);
                this.client.magicSystem.anotherShow = show;
            }
            this.client.magicSystem.additionHealthShow = isInGuardRuin;
            //设置游戏模式
            this.isInRuinJudge = isInGuardRuin || isInStoneRuin;
            if (!this.isInRuinJudge) {
                this.exPlayer.command.run(`fog @s remove "ruin_fog"`);
            }
            let mode = this.exPlayer.getGameMode();
            // if (this.isInRuinJudge && mode === GameMode.survival) {
            //     this.exPlayer.setGameMode(GameMode.adventure);
            // } else if (!this.isInRuinJudge && mode === GameMode.adventure && this.data.dimBackMode === 0) {
            //     this.exPlayer.setGameMode(GameMode.survival);
            // } else if (!this.isInRuinJudge && (mode !== GameMode.adventure)) {
            //     this.data.dimBackMode = 0;
            // } else if (!this.isInRuinJudge && (mode === GameMode.adventure)) {
            //     this.data.dimBackMode = 2;
            // }
            // if(this.isInRuinJudge){
            //     if(event.currentTick % 40 === 0){
            //         let scores = this.exPlayer.getScoresManager();
            //         scores.setScoreAsync(this.i_damp,13);
            //         scores.setScoreAsync(this.i_inviolable,13);
            //         scores.setScoreAsync(this.i_soft,13);
            //     }
            // }
        });
        // this.getEvents().exEvents.itemOnHandChange.subscribe((e) => {
        //     this.sayTo(e.afterItem?.typeId + "");
        // });
        this.getEvents().exEvents.onceItemUseOn.subscribe(e => {
            let block;
            try {
                block = this.getDimension().getBlock(e.blockLocation);
            }
            catch (e) { }
            if (e.item.typeId === "wb:start_key") {
                //遗迹传送门激活
                let p = this.client.getServer().portal_desertBoss;
                if ((block === null || block === void 0 ? void 0 : block.typeId) === "wb:block_magic_equipment") {
                    const v2 = new Vector3(e.blockLocation).add(2, 2, 2);
                    const v1 = new Vector3(e.blockLocation).sub(2, 0, 2);
                    let m = p.setArea(new ExBlockArea(v1, v2, true))
                        .setDimension(this.getDimension(MinecraftDimensionTypes.overworld))
                        .find();
                    if (m) {
                        p.analysis({
                            X: MinecraftBlockTypes.sandstone.id,
                            W: "wb:portal_desertboss",
                            Y: "wb:portal_desertboss",
                            A: MinecraftBlockTypes.air.id,
                            S: MinecraftBlockTypes.stoneBlockSlab2.id,
                            C: MinecraftBlockTypes.cobblestoneWall.id
                        })
                            .putStructure(m);
                        const parLoc = new Vector3(e.blockLocation).add(0.5, 0.5, 0.5);
                        this.getExDimension().spawnParticle("wb:portal_desertboss_par1", parLoc);
                        this.getExDimension().spawnParticle("wb:portal_desertboss_par2", parLoc);
                    }
                    v2.sub(0, 1, 0);
                    p = this.client.getServer().portal_stoneBoss;
                    m = p.setArea(new ExBlockArea(v1, v2, true))
                        .setDimension(this.getDimension(MinecraftDimensionTypes.overworld))
                        .find();
                    if (m) {
                        p.analysis({
                            X: MinecraftBlockTypes.sandstone.id,
                            W: "wb:portal_stoneboss",
                            Y: "wb:portal_stoneboss",
                            S: MinecraftBlockTypes.cobblestoneWall.id,
                            A: MinecraftBlockTypes.air.id,
                            B: MinecraftBlockTypes.stonebrick.id
                        })
                            .putStructure(m);
                    }
                }
            }
        });
    }
    onLoaded() {
    }
    onLeave() {
    }
}
//# sourceMappingURL=PomDimRuinsSystem.js.map