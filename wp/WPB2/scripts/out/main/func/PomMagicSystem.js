import TimeLoopTask from "../../modules/exmc/utils/TimeLoopTask.js";
import { Talent } from "../cache/TalentData.js";
import GameController from "./GameController.js";
export default class PomMagicSystem extends GameController {
    constructor() {
        super(...arguments);
        this.wbflLooper = new TimeLoopTask(this.getEvents(), () => {
            this.exPlayer.getScoresManager().addScoreAsync("wbfl", 2);
        }).delay(5000);
        this.armorCoolingLooper = new TimeLoopTask(this.getEvents(), () => {
            let scores = this.exPlayer.getScoresManager();
            if (scores.getScore("wbkjlq") > 0)
                scores.removeScore("wbkjlq", 1);
        }).delay(1000);
    }
    onJoin() {
    }
    onLoaded() {
        this.wbflLooper.start();
        this.armorCoolingLooper.start();
    }
    onLeave() {
    }
    upDateByTalent(talentRes) {
        var _a, _b, _c;
        let scores = this.exPlayer.getScoresManager();
        scores.setScore("wbwqlqjs", Math.round(100 + ((_a = talentRes.get(Talent.DEFENSE)) !== null && _a !== void 0 ? _a : 0)));
        this.wbflLooper.delay(1 / (1 / 5000 * (1 + ((_b = talentRes.get(Talent.DEFENSE)) !== null && _b !== void 0 ? _b : 0) / 100) * (1 + scores.getScore("wbgjcg") * 3 / 100)));
        this.armorCoolingLooper.delay(1 / (1 / 1000 * (1 + ((_c = talentRes.get(Talent.RELOAD)) !== null && _c !== void 0 ? _c : 0) / 100)));
    }
}
//# sourceMappingURL=PomMagicSystem.js.map