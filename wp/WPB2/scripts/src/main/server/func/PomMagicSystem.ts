import TimeLoopTask from "../../../modules/exmc/utils/TimeLoopTask.js";
import { Talent } from "../cache/TalentData.js";
import GameController from "./GameController.js";

export default class PomMagicSystem extends GameController {
    public static readonly weaponCoolingChar = "";
    public static readonly armorCoolingChar = "";
    public static readonly wbflChar = "";
    public static readonly AdditionHPChar = "";


    additionHealthShow = false;
    additionHealth = 40;
    scoresManager = this.exPlayer.getScoresManager();
    wbflLooper = new TimeLoopTask(this.getEvents(), () => {
        this.scoresManager.addScoreAsync("wbfl", 2);
    }).delay(5000);
    armorCoolingLooper = new TimeLoopTask(this.getEvents(), () => {
        if (this.scoresManager.getScore("wbkjlq") > 0) this.scoresManager.removeScore("wbkjlq", 1);
    }).delay(1000);

    actionbarShow = new TimeLoopTask(this.getEvents(), () => {
        let fromData: [string, number, boolean, boolean, string][] = [
            [PomMagicSystem.AdditionHPChar, this.additionHealth / 100, true, this.additionHealthShow, "HP"],
            [PomMagicSystem.wbflChar, this.scoresManager.getScore("wbfl") / 200, true, true, "MP"],
            [PomMagicSystem.weaponCoolingChar, this.scoresManager.getScore("wbwqlq") / 20, false, true, "CD"],
            [PomMagicSystem.armorCoolingChar, this.scoresManager.getScore("wbkjlqcg") / 20, false, true, "CD"]];

        let arr: string[] = [];
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


    onJoin(): void {

    }
    onLoaded(): void {
        this.wbflLooper.start();
        this.armorCoolingLooper.start();
        this.actionbarShow.start();
    }
    onLeave(): void {

    }
    upDateByTalent(talentRes: Map<number, number>) {
        let scores = this.exPlayer.getScoresManager();
        scores.setScore("wbwqlqjs", Math.round(100 + (talentRes.get(Talent.DEFENSE) ?? 0)));
        this.wbflLooper.delay(1 / (1 / 5000 * (1 + (talentRes.get(Talent.DEFENSE) ?? 0) / 100) * (1 + scores.getScore("wbdjcg") * 3 / 100)));
        this.armorCoolingLooper.delay(1 / (1 / 1000 * (1 + (talentRes.get(Talent.RELOAD) ?? 0) / 100)));
    }
}