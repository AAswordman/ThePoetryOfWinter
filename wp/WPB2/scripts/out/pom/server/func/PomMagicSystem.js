import { world, DynamicPropertiesDefinition, MinecraftEntityTypes } from "@minecraft/server";
import MathUtil from "../../../modules/exmc/math/MathUtil.js";
import ExSystem from "../../../modules/exmc/utils/ExSystem.js";
import VarOnChangeListener from "../../../modules/exmc/utils/VarOnChangeListener.js";
import { Talent } from "../cache/TalentData.js";
import GameController from "./GameController.js";
import { MinecraftEffectTypes } from "../../../modules/vanilla-data/lib/mojang-effect.js";
world.afterEvents.worldInitialize.subscribe((e) => {
    let def = new DynamicPropertiesDefinition()
        .defineNumber("health", 40)
        .defineNumber("damageAbsorbed", 0);
    e.propertyRegistry.registerEntityTypeDynamicProperties(def, MinecraftEntityTypes.player);
});
export default class PomMagicSystem extends GameController {
    constructor() {
        super(...arguments);
        this.additionHealthShow = false;
        this.healthShow = true;
        this.additionHealth = 40;
        this.gameHealth = 30;
        this.gameMaxHealth = 30;
        this.scoresManager = this.exPlayer.getScoresManager();
        this.wbflLooper = ExSystem.tickTask(() => {
            if (this.scoresManager.getScore("wbfl") < 200)
                this.scoresManager.addScore("wbfl", 2);
        }).delay(5 * 20);
        this.experienceAddLooper = ExSystem.tickTask(() => {
            // this.data.gameExperience += 1;
        }).delay(20 * 3);
        this.armorCoolingLooper = ExSystem.tickTask(() => {
            if (this.scoresManager.getScore("wbkjlq") > 0)
                this.scoresManager.removeScore("wbkjlq", 1);
        }).delay(1 * 20);
        this._anotherShow = [];
        this._mapShow = new Map();
        this.healthSaver = ExSystem.tickTask(() => {
            this.player.setDynamicProperty('health', this.gameHealth);
            this.player.setDynamicProperty('damageAbsorbed', this.damageAbsorbed);
        }).delay(20 * 5);
        this.actionbarShow = ExSystem.tickTask(() => {
            // let fromData: [string, number, boolean, boolean, string][] = [
            //     [PomMagicSystem.AdditionHPChar, this.additionHealth / 100, true, this.additionHealthShow, "HP"],
            //     [PomMagicSystem.AdditionHPChar, this.gameHealth / 100, true, this.healthShow, "HP"],
            //     [PomMagicSystem.wbflChar, this.scoresManager.getScore("wbfl") / 200, true, true, "MP"],
            //     [PomMagicSystem.weaponCoolingChar, this.scoresManager.getScore("wbwqlq") / 20, false, true, "CD"],
            //     [PomMagicSystem.armorCoolingChar, this.scoresManager.getScore("wbkjlqcg") / 20, false, true, "CD"]];
            // let arr: string[] = [];
            // for (let e of fromData) {
            //     if ((e[1] === 0 && !e[2]) || !e[3]) {
            //         continue;
            //     }
            //     let s = "";
            //     while (e[1] >= 0.2) {
            //         e[1] -= 0.2;
            //         s += e[0][0];
            //     }
            //     if (e[1] < 0) {
            //         e[1] = 0;
            //     }
            //     if (s.length < 5) {
            //         s += e[0][e[0].length - 1 - Math.floor(e[1] / (0.2 / e[0].length))];
            //     }
            //     while (s.length < 5) {
            //         s += e[0][e[0].length - 1];
            //     }
            //     s = e[4] + ": " + s;
            //     arr.push(s);
            // }
            const oldData = this.lastFromData;
            const wbfl = this.scoresManager.getScore("wbfl");
            let grade = this.getNumberFont(MathUtil.clamp(this.data.gameGrade, 0, 99));
            if (grade.length === 1)
                grade = PomMagicSystem.numberFont[0] + grade;
            let fromData = [
                this.gameHealth,
                [this.gameHealth / this.gameMaxHealth],
                [wbfl / 200],
                wbfl,
                [this.scoresManager.getScore("wbwqlq") / 20],
                [this.scoresManager.getScore("wbkjlqcg") / 20],
                [this.damageAbsorbed / this.gameMaxHealth],
                this.data.gameGrade,
                [this.data.gameExperience / (this.getGradeNeedExperience(1 + this.data.gameGrade) - this.getGradeNeedExperience(this.data.gameGrade))],
                [(grade), grade.length * 3]
            ];
            this.lastFromData = fromData;
            let arr1 = fromData.map((e, index) => {
                let v;
                if (typeof e === "number") {
                    let fix = Math.round(e) + "";
                    v = ("_" + Math.min(8, fix.length) + fix.substring(Math.max(fix.length - 8, 0)));
                }
                else if (e instanceof Array) {
                    if (e.length === 1) {
                        e = MathUtil.clamp(Math.round(100 * (e[0])), 0, 100);
                        let old;
                        if (oldData) {
                            let n = oldData[index];
                            old = MathUtil.clamp(Math.round(100 * (n[0])), 0, 100);
                        }
                        else {
                            old = 0;
                        }
                        v = "_6" + "0".repeat(Math.max(0, (3 - e.toString().length))) + e +
                            "0".repeat(Math.max(0, (3 - old.toString().length))) + old;
                    }
                    else if (e.length === 2) {
                        v = "_" + e[1] + e[0];
                    }
                    else {
                        v = "";
                    }
                }
                else {
                    v = "";
                }
                return v + "x".repeat(Math.max(0, 10 - v.length));
            });
            // console.warn(arr);
            let arr2 = [];
            for (let i = 0; i < 50; i++) {
                arr2.push("");
            }
            arr2 = arr2.concat(Array.from(this._mapShow.values()).map(e => e.join('\n§r')));
            this.exPlayer.titleActionBar(arr1.join("\n") + "定位".repeat(6) + arr2.join("\n§r"));
        }).delay(8);
        this.damageAbsorbed = 0;
    }
    registActionbarPass(name) {
        this._mapShow.set(name, []);
        return this.getActionbarByPass(name);
    }
    getActionbarSize() {
        return this._mapShow.size;
    }
    getActionbarByPass(name) {
        return this._mapShow.get(name);
    }
    setActionbarByPass(name, msg) {
        this._mapShow.set(name, msg);
    }
    deleteActionbarPass(name) {
        this._mapShow.delete(name);
    }
    getNumberFont(num) {
        let s = "";
        for (let i of num.toString()) {
            s += PomMagicSystem.numberFont[parseInt(i)];
        }
        return s;
    }
    onJoin() {
        var _a;
        const health = this.exPlayer.getComponent("minecraft:health");
        let healthListener = new VarOnChangeListener((n, l) => {
            let change = n - (l !== null && l !== void 0 ? l : 0);
            this.gameHealth = Math.min(this.gameHealth + change, this.gameMaxHealth);
            this.exPlayer.health = 50000;
            healthListener.value = 50000;
        }, health.currentValue);
        // this.getEvents().exEvents.tick.subscribe(e => {
        //     healthListener.upDate(health!.currentValue);
        // });
        this.getEvents().exEvents.afterEntityHealthChanged.subscribe(e => {
            healthListener.upDate(e.newValue);
        });
        this.getEvents().exEvents.afterPlayerSpawn.subscribe(e => {
            this.gameHealth = this.gameMaxHealth;
        });
        this.healthSaver.start();
        this.gameHealth = (_a = this.player.getDynamicProperty("health")) !== null && _a !== void 0 ? _a : 0;
        this.actionbarShow.delay(this.globalSettings.uiUpdateDelay);
        this.getEvents().exEvents.afterEffectAdd.subscribe(e => {
            if (e.effect.typeId === MinecraftEffectTypes.Absorption) {
                this.setdamageAbsorbed(e.effect.amplifier * 4);
                this.player.removeEffect(MinecraftEffectTypes.Absorption);
            }
        });
        this.getEvents().exEvents.onLongTick.subscribe(e => {
            if (e.currentTick % 4 !== 0)
                return;
            let eff;
            if ((eff = this.player.getEffect(MinecraftEffectTypes.Absorption)) !== undefined) {
                this.setdamageAbsorbed(eff.amplifier * 4);
                this.player.removeEffect(MinecraftEffectTypes.Absorption);
            }
        });
    }
    setdamageAbsorbed(num) {
        if (num > this.damageAbsorbed) {
            this.damageAbsorbed = num;
        }
    }
    onLoad() {
        if (!this.data.gameExperience)
            this.data.gameExperience = 0;
        this.data.gameGrade = this.exPlayer.getScoresManager().getScore("wbdj");
        this.wbflLooper.start();
        this.armorCoolingLooper.start();
        this.actionbarShow.start();
        this.experienceAddLooper.start();
    }
    onLeave() {
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
    getGradeNeedExperience(g) {
        return (150 * Math.pow((g - 1), 2) + 1050 * (g - 1) + 900);
    }
    upDateByTalent(talentRes) {
        var _a, _b, _c;
        let scores = this.exPlayer.getScoresManager();
        scores.setScore("wbwqlqjs", Math.round((this.client.getDifficulty().coolingFactor) * (100 + ((_a = talentRes.get(Talent.CHARGING)) !== null && _a !== void 0 ? _a : 0))));
        this.wbflLooper.stop();
        this.armorCoolingLooper.stop();
        this.experienceAddLooper.stop();
        this.experienceAddLooper.delay((2 * 20) / this.client.getDifficulty().LevelFactor);
        this.wbflLooper.delay((1 / this.client.getDifficulty().wbflAddFactor) *
            (5 * 20 / ((1 + ((_b = talentRes.get(Talent.SOURCE)) !== null && _b !== void 0 ? _b : 0) / 100) * (1 + this.data.gameGrade * 3 / 100))));
        this.armorCoolingLooper.delay((1 / this.client.getDifficulty().coolingFactor) *
            (1 / (1 / (1 * 20) * (1 + ((_c = talentRes.get(Talent.RELOAD)) !== null && _c !== void 0 ? _c : 0) / 100))));
        this.wbflLooper.start();
        this.armorCoolingLooper.start();
        this.experienceAddLooper.start();
    }
}
PomMagicSystem.weaponCoolingChar = "";
PomMagicSystem.armorCoolingChar = "";
PomMagicSystem.wbflChar = "";
PomMagicSystem.AdditionHPChar = "";
PomMagicSystem.numberFont = "";
//# sourceMappingURL=PomMagicSystem.js.map