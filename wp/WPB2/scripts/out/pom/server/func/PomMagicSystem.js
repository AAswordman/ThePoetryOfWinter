import ExSystem from "../../../modules/exmc/utils/ExSystem.js";
import { Talent } from "../cache/TalentData.js";
import GameController from "./GameController.js";
export default class PomMagicSystem extends GameController {
    constructor() {
        super(...arguments);
        this.additionHealthShow = false;
        this.additionHealth = 40;
        this.scoresManager = this.exPlayer.getScoresManager();
        this.wbflLooper = ExSystem.tickTask(() => {
            if (this.scoresManager.getScore("wbfl") < 200)
                this.scoresManager.addScore("wbfl", 2);
        }).delay(5 * 20);
        this.armorCoolingLooper = ExSystem.tickTask(() => {
            if (this.scoresManager.getScore("wbkjlq") > 0)
                this.scoresManager.removeScore("wbkjlq", 1);
        }).delay(1 * 20);
        this._anotherShow = [];
        this._mapShow = new Map();
        this.actionbarShow = ExSystem.tickTask(() => {
            let fromData = [
                [PomMagicSystem.AdditionHPChar, this.additionHealth / 100, true, this.additionHealthShow, "HP"],
                [PomMagicSystem.wbflChar, this.scoresManager.getScore("wbfl") / 200, true, true, "MP"],
                [PomMagicSystem.weaponCoolingChar, this.scoresManager.getScore("wbwqlq") / 20, false, true, "CD"],
                [PomMagicSystem.armorCoolingChar, this.scoresManager.getScore("wbkjlqcg") / 20, false, true, "CD"]
            ];
            let arr = [];
            for (let e of fromData) {
                if ((e[1] === 0 && !e[2]) || !e[3]) {
                    continue;
                }
                let s = "";
                while (e[1] >= 0.2) {
                    e[1] -= 0.2;
                    s += e[0][0];
                }
                if (e[1] < 0) {
                    e[1] = 0;
                }
                if (s.length < 5) {
                    s += e[0][e[0].length - 1 - Math.floor(e[1] / (0.2 / e[0].length))];
                }
                while (s.length < 5) {
                    s += e[0][e[0].length - 1];
                }
                s = e[4] + ": " + s;
                arr.push(s);
            }
            for (let i = 0; i < 100; i++) {
                arr.push("");
            }
            arr = arr.concat(Array.from(this._mapShow.values()).map(e => e.join('\n§r')));
            this.exPlayer.titleActionBar(arr.join("\n§r"));
        }).delay(5);
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
    onJoin() {
    }
    onLoaded() {
        this.wbflLooper.start();
        this.armorCoolingLooper.start();
        this.actionbarShow.start();
    }
    onLeave() {
        this.wbflLooper.stop();
        this.armorCoolingLooper.stop();
        this.actionbarShow.stop();
    }
    upDateByTalent(talentRes) {
        var _a, _b, _c;
        let scores = this.exPlayer.getScoresManager();
        scores.setScore("wbwqlqjs", Math.round(100 + ((_a = talentRes.get(Talent.CHARGING)) !== null && _a !== void 0 ? _a : 0)));
        this.wbflLooper.stop();
        this.armorCoolingLooper.stop();
        this.wbflLooper.delay(5 * 20 / ((1 + ((_b = talentRes.get(Talent.SOURCE)) !== null && _b !== void 0 ? _b : 0) / 100) * (1 + scores.getScore("wbdjcg") * 3 / 100)));
        this.armorCoolingLooper.delay(1 / (1 / (1 * 20) * (1 + ((_c = talentRes.get(Talent.RELOAD)) !== null && _c !== void 0 ? _c : 0) / 100)));
        this.wbflLooper.start();
        this.armorCoolingLooper.start();
    }
}
PomMagicSystem.weaponCoolingChar = "";
PomMagicSystem.armorCoolingChar = "";
PomMagicSystem.wbflChar = "";
PomMagicSystem.AdditionHPChar = "";
//# sourceMappingURL=PomMagicSystem.js.map