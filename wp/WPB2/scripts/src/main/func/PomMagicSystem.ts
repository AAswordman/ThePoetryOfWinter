import TimeLoopTask from "../../modules/exmc/utils/TimeLoopTask.js";
import { Talent } from "../cache/TalentData.js";
import GameController from "./GameController.js";

export default class PomMagicSystem extends GameController{
    wbflLooper = new TimeLoopTask(this.getEvents(), () => {
		this.exPlayer.getScoresManager().addScoreAsync("wbfl", 2);
	}).delay(5000);
	armorCoolingLooper = new TimeLoopTask(this.getEvents(), () => {
		let scores = this.exPlayer.getScoresManager();
		if (scores.getScore("wbkjlq") > 0) scores.removeScore("wbkjlq", 1);
	}).delay(1000);


    onJoin(): void {
        
    }
    onLoaded(): void {
        this.wbflLooper.start();
		this.armorCoolingLooper.start();
    }
    onLeave(): void {
        
    }
    upDateByTalent(talentRes:Map<number,number>){
        let scores = this.exPlayer.getScoresManager();
		scores.setScore("wbwqlqjs", Math.round(100 + (talentRes.get(Talent.DEFENSE) ?? 0)));
        this.wbflLooper.delay(1 / (1 / 5000 * (1 + (talentRes.get(Talent.DEFENSE) ?? 0) / 100) * (1 + scores.getScore("wbgjcg") * 3 / 100)));
		this.armorCoolingLooper.delay(1 / (1 / 1000 * (1 + (talentRes.get(Talent.RELOAD) ?? 0) / 100)));
    }
}