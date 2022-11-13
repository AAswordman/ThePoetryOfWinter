import TimeLoopTask from "../../../modules/exmc/utils/TimeLoopTask.js";
import { Talent } from "../cache/TalentData.js";
import GameController from "./GameController.js";
export default class PomMagicSystem extends GameController {
    constructor() {
        super(...arguments);
        this.additionHealthShow = false;
        this.additionHealth = 40;
        this.scoresManager = this.exPlayer.getScoresManager();
        this.wbflLooper = new TimeLoopTask(this.getEvents(), () => {
            this.scoresManager.addScoreAsync("wbfl", 2);
        }).delay(5000);
        this.armorCoolingLooper = new TimeLoopTask(this.getEvents(), () => {
            if (this.scoresManager.getScore("wbkjlq") > 0)
                this.scoresManager.removeScore("wbkjlq", 1);
        }).delay(1000);
        this.actionbarShow = new TimeLoopTask(this.getEvents(), () => {
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
                if (s.length < 5) {
                    s += e[0][e[0].length - 1 - Math.floor(e[1] / (0.2 / e[0].length))];
                }
                while (s.length < 5) {
                    s += e[0][e[0].length - 1];
                }
                s = e[4] + ": " + s;
                arr.push(s);
            }
            this.exPlayer.titleActionBar(arr.join("\n"));
        }).delay(500);
    }
    onJoin() {
    }
    onLoaded() {
        this.wbflLooper.start();
        this.armorCoolingLooper.start();
        this.actionbarShow.start();
    }
    onLeave() {
    }
    upDateByTalent(talentRes) {
        var _a, _b, _c;
        let scores = this.exPlayer.getScoresManager();
        scores.setScore("wbwqlqjs", Math.round(100 + ((_a = talentRes.get(Talent.DEFENSE)) !== null && _a !== void 0 ? _a : 0)));
        this.wbflLooper.delay(1 / (1 / 5000 * (1 + ((_b = talentRes.get(Talent.DEFENSE)) !== null && _b !== void 0 ? _b : 0) / 100) * (1 + scores.getScore("wbdjcg") * 3 / 100)));
        this.armorCoolingLooper.delay(1 / (1 / 1000 * (1 + ((_c = talentRes.get(Talent.RELOAD)) !== null && _c !== void 0 ? _c : 0) / 100)));
    }
}
PomMagicSystem.weaponCoolingChar = "";
PomMagicSystem.armorCoolingChar = "";
PomMagicSystem.wbflChar = "";
PomMagicSystem.AdditionHPChar = "";
//# sourceMappingURL=PomMagicSystem.js.map