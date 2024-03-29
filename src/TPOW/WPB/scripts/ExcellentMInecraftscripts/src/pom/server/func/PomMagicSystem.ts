import { Effect } from '@minecraft/server';
import MathUtil from "../../../modules/exmc/math/MathUtil.js";
import ExSystem from "../../../modules/exmc/utils/ExSystem.js";
import VarOnChangeListener from "../../../modules/exmc/utils/VarOnChangeListener.js";
import { Talent } from "../cache/TalentData.js";
import GameController from "./GameController.js";
import { MinecraftEffectTypes } from '../../../modules/vanilla-data/lib/index.js';
import ExGame from '../../../modules/exmc/server/ExGame.js';



export default class PomMagicSystem extends GameController {
    public static readonly weaponCoolingChar = "";
    public static readonly armorCoolingChar = "";
    public static readonly wbflChar = "";
    public static readonly AdditionHPChar = "";
    public static readonly numberFont = "";


    additionHealthShow = false;
    healthShow = true;
    additionHealth = 40;
    gameHealth = 30;
    isDied = false;
    isProtected = false;
    gameMaxHealth = 30;
    scoresManager = this.exPlayer.getScoresManager();
    wbflLooper = ExSystem.tickTask(() => {
        if (this.scoresManager.getScore("wbfl") < 200) this.scoresManager.addScore("wbfl", 2);
    }).delay(5 * 20);
    experienceAddLooper = ExSystem.tickTask(() => {
        this.data.gameExperience += 1;
    }).delay(12 * 20);
    armorCoolingLooper = ExSystem.tickTask(() => {
        if (this.scoresManager.getScore("wbkjlq") > 0) this.scoresManager.removeScore("wbkjlq", 1);
    }).delay(1 * 20);

    private _anotherShow: string[] = [];
    private _mapShow = new Map<string, string[]>();
    healthSaver = ExSystem.tickTask(() => {
        this.player.setDynamicProperty('health', this.gameHealth);
        this.player.setDynamicProperty('damageAbsorbed', this.damageAbsorbed);
        this.player.setDynamicProperty('magicReduce', this.magicReduce);
    }).delay(20 * 5);
    registActionbarPass(name: string) {
        this._mapShow.set(name, []);
        return <string[]>this.getActionbarByPass(name);
    }
    getActionbarSize() {
        return this._mapShow.size;
    }
    getActionbarByPass(name: string) {
        return this._mapShow.get(name);
    }
    setActionbarByPass(name: string, msg: string[]) {
        this._mapShow.set(name, msg);
    }
    deleteActionbarPass(name: string) {
        this._mapShow.delete(name);
    }

    private lastFromData?: (string | number | [number] | [string, number])[];

    dataCache = {
        wbfl: 200,
        wbwqlq: 0,
        wbkjlqcg: 0
    };
    dataCacheRefreshDelay = 0;
    actionbarShow = ExSystem.tickTask(() => {
        const oldData = this.lastFromData;
        this.dataCacheRefreshDelay += 1;
        if (this.dataCacheRefreshDelay >= this.globalSettings.uiDataUpdateDelay) {
            this.dataCacheRefreshDelay = 0;
            this.dataCache.wbfl = this.scoresManager.getScore("wbfl");
            this.dataCache.wbwqlq = this.scoresManager.getScore("wbwqlq");
            this.dataCache.wbkjlqcg = this.scoresManager.getScore("wbkjlqcg");
        }
        let grade = this.getNumberFont(MathUtil.clamp(this.data.gameGrade, 0, 99));
        if (grade.length === 1) grade = PomMagicSystem.numberFont[0] + grade;
        let fromData: (string | number | [number] | [string, number])[] = [
            this.gameHealth,
            [this.gameHealth / this.gameMaxHealth],
            [this.dataCache.wbfl / 200],
            this.dataCache.wbfl,
            [this.dataCache.wbwqlq / 20],
            [this.dataCache.wbkjlqcg / 20],
            [this.damageAbsorbed / this.gameMaxHealth + this.magicReduce / this.gameMaxHealth],
            this.data.gameGrade,
            [this.data.gameExperience / (this.getGradeNeedExperience(1 + this.data.gameGrade) - this.getGradeNeedExperience(this.data.gameGrade))],
            [(grade), grade.length * 3],
            [this.magicReduce / this.gameMaxHealth],
            [this.data.uiCustomSetting.topLeftMessageBarLayer1 / 100],
            [this.data.uiCustomSetting.topLeftMessageBarLayer2 / 100],
            [this.data.uiCustomSetting.topLeftMessageBarLayer3 / 100],
            [this.data.uiCustomSetting.topLeftMessageBarLayer4 / 100],
            [this.data.uiCustomSetting.topLeftMessageBarLayer5 / 100],
            [this.data.uiCustomSetting.topLeftMessageBarStyle]
        ];
        this.lastFromData = fromData;

        let arr1 = fromData.map((e, index) => {
            let v;
            if (typeof e === "number") {
                let fix = Math.round(e) + "";
                v = ("_" + Math.min(8, fix.length) + fix.substring(Math.max(fix.length - 8, 0)));
            } else if (e instanceof Array) {
                if (e.length === 1) {
                    e = MathUtil.clamp(Math.round(100 * (e[0])), 0, 100);
                    let old: number;
                    if (oldData) {
                        let n = oldData[index] as [number];
                        old = MathUtil.clamp(Math.round(100 * (n[0])), 0, 100);
                    } else {
                        old = 0;
                    }
                    v = "_6" + "0".repeat(Math.max(0, (3 - e.toString().length))) + e +
                        "0".repeat(Math.max(0, (3 - old.toString().length))) + old;
                } else if (e.length === 2) {
                    v = "_" + e[1] + e[0];
                    v += "x".repeat(8 - e[1]);
                    return v;
                } else {
                    v = "";
                }
            } else {
                v = "";
            }

            return v + "x".repeat(Math.max(0, 10 - v.length));
        });
        // console.warn(arr1);
        let arr2: string[] = [];
        for (let i = 0; i < 50; i++) {
            arr2.push("");
        }
        arr2 = arr2.concat(Array.from(this._mapShow.values()).map(e => e.join('\n§r')));

        this.exPlayer.titleActionBar(arr1.join("\n") + "定位".repeat(6) + arr2.join("\n§r"));

    }).delay(8);

    damageAbsorbed = 0;
    magicReduce = 0;

    getNumberFont(num: number) {
        let s = "";
        for (let i of num.toString()) {
            s += PomMagicSystem.numberFont[parseInt(i)];
        }
        return s;
    }
    hurtState = false;
    hurtMaxNum = 0;
    onJoin(): void {
        const health = this.exPlayer.getComponent("minecraft:health")!;

        let hurtTimeId = 0;
        let healthListener = new VarOnChangeListener((n, l) => {
            healthListener.value = 25000;
            health.setCurrentValue(25000);
            let change = n - (l ?? 0);
            // if (change < 0 && this.hurtState) {
            //     if (this.hurtMaxNum <= -change) return;//build-in method
            //     ExGame.clearRun(hurtTimeId);
            //     hurtTimeId = ExGame.runTimeout(() => {
            //         this.hurtState = false;
            //         this.hurtMaxNum = 0;
            //     }, 9);
            //     change += this.hurtMaxNum;
            //     this.hurtMaxNum = -(n - (l ?? 0));
            // }
            // if (!this.hurtState && change < 0) {
            //     hurtTimeId = ExGame.runTimeout(() => {
            //         this.hurtState = false;
            //         this.hurtMaxNum = 0;
            //     }, 9);
            //     this.hurtState = true;
            //     this.hurtMaxNum = change;
            // }
            if (!this.isProtected) {
                if (n === 1) {
                    //不死图腾
                    this.gameHealth = 1;
                    this.isProtected = true;
                    this.setTimeout(() => {
                        this.isProtected = false;
                    }, 1500);
                } else {
                    this.gameHealth = Math.min(this.gameHealth + change, this.gameMaxHealth);
                }
            }
        }, health!.currentValue);
        // this.getEvents().exEvents.tick.subscribe(e => {
        //     healthListener.upDate(health!.currentValue);
        // });
        this.getEvents().exEvents.afterEntityHealthChanged.subscribe(e => {
            healthListener.upDate(e.newValue);
        });
        this.healthSaver.start();
        let n: number

        this.getEvents().exEvents.afterPlayerSpawn.subscribe(e => {
            this.exPlayer.triggerEvent("hp:50000");
            //设置默认游戏血量

            //绕开常规逻辑设置血量
            this.isDied = false;
            this.isProtected = true;
            this.setTimeout(() => {
                this.isProtected = false;
            }, 3000);
            this.gameHealth = this.gameMaxHealth;
            healthListener.value = 25000;
            health.setCurrentValue(25000);
            if (e.initialSpawn) {
                this.gameHealth = MathUtil.clamp(
                    this.player.getDynamicProperty("health") as number ?? this.gameMaxHealth,
                    1, this.gameMaxHealth);
            } else {
                this.gameHealth = this.gameMaxHealth;
            }
        });


        this.magicReduce = this.player.getDynamicProperty("magicReduce") as number ?? 0;
        this.damageAbsorbed = this.player.getDynamicProperty("damageAbsorbed") as number ?? 0;
        this.gameHealth = MathUtil.clamp(
            this.player.getDynamicProperty("health") as number ?? this.gameMaxHealth,
            1, this.gameMaxHealth);
        this.actionbarShow.delay(this.globalSettings.uiUpdateDelay);

        this.getEvents().exEvents.afterEffectAdd.subscribe(e => {
            if (e.effect.typeId === MinecraftEffectTypes.Absorption) {
                this.setDamageAbsorbed(e.effect.amplifier * 4);
                this.player.removeEffect(MinecraftEffectTypes.Absorption);
            }
        });
        this.getEvents().exEvents.onLongTick.subscribe(e => {
            if (e.currentTick % 4 !== 0) return;
            let eff: Effect | undefined;
            if ((eff = this.player.getEffect(MinecraftEffectTypes.Absorption)) !== undefined) {
                this.setDamageAbsorbed((eff.amplifier + 1) * 4);
                this.player.removeEffect(MinecraftEffectTypes.Absorption);
            }
            if ((eff = this.player.getEffect(MinecraftEffectTypes.HealthBoost)) !== undefined) {
                this.setMagicAbsorbed((eff.amplifier + 1) * 4);
                this.player.removeEffect(MinecraftEffectTypes.HealthBoost);
            }

        });
    }

    setDamageAbsorbed(num: number) {
        if (num > this.damageAbsorbed) {
            this.damageAbsorbed = num;
        }
    }
    tryReduceDamageAbsorbed(num: number) {
        if (num > this.damageAbsorbed) {
            let res = num - this.damageAbsorbed;
            this.damageAbsorbed = 0;
            return res;
        } else {
            this.damageAbsorbed -= num;
            return 0;
        }
    }
    setMagicAbsorbed(num: number) {
        if (num > this.magicReduce) {
            this.magicReduce = num;
        }
    }
    tryReduceMagicAbsorbed(num: number) {
        if (num > this.magicReduce) {
            let res = num - this.magicReduce;
            this.magicReduce = 0;
            return res;
        } else {
            this.magicReduce -= num;
            return 0;
        }
    }

    onLoad(): void {
        if (!this.data.gameExperience) this.data.gameExperience = 0;
        this.data.gameGrade = this.exPlayer.getScoresManager().getScore("wbdj");

        this.wbflLooper.start();
        this.armorCoolingLooper.start();
        this.actionbarShow.start();
        this.experienceAddLooper.start();
    }
    onLeave(): void {
        this.wbflLooper.stop();
        this.armorCoolingLooper.stop();
        this.actionbarShow.stop();
        this.healthSaver.stop();
        this.experienceAddLooper.stop();
    }
    upDateGrade() {
        this.exPlayer.getScoresManager().setScore("wbdj", this.data.gameGrade);
    }

    checkUpgrade() {
        this.data.gameGrade = this.exPlayer.getScoresManager().getScore("wbdj");
        const ex = this.getGradeNeedExperience(1 + this.data.gameGrade) - this.getGradeNeedExperience(this.data.gameGrade);
        if (this.data.gameExperience > ex) {
            this.data.gameExperience -= ex;
            this.data.gameGrade += 1;
            this.upDateGrade();
        }
    }

    getGradeNeedExperience(g: number) {
        return (150 * (g - 1) ** 2 + 1050 * (g - 1) + 900);
    }

    upDateByTalent(talentRes: Map<number, number>) {
        let scores = this.exPlayer.getScoresManager();
        scores.setScore("wbwqlqjs", Math.round((this.client.getDifficulty().coolingFactor) * (100 + (talentRes.get(Talent.CHARGING) ?? 0))));
        this.wbflLooper.stop();
        this.armorCoolingLooper.stop();
        this.experienceAddLooper.stop();
        this.experienceAddLooper.delay((12 * 20) / this.client.getDifficulty().LevelFactor);
        this.wbflLooper.delay((1 / this.client.getDifficulty().wbflAddFactor) *
            (5 * 20 / ((1 + (talentRes.get(Talent.SOURCE) ?? 0) / 100) * (1 + this.data.gameGrade * 3 / 100))));
        this.armorCoolingLooper.delay((1 / this.client.getDifficulty().coolingFactor) *
            (1 / (1 / (1 * 20) * (1 + (talentRes.get(Talent.RELOAD) ?? 0) / 100))));
        this.wbflLooper.start();
        this.armorCoolingLooper.start();
        this.experienceAddLooper.start();
    }
}