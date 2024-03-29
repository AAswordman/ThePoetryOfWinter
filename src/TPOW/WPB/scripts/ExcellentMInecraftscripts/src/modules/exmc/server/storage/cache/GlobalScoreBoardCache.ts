import ExScoresManager, { Objective } from "../../entity/ExScoresManager.js";
import ExNullEntity from '../../entity/ExNullEntity.js';

export default class GlobalScoreBoardCache {
    objective: Objective;
    entity = new ExNullEntity("");
    useMap: Map<string, number>;
    scores: ExScoresManager;
    constructor(objective: Objective, public useCache = true) {
        this.objective = objective;
        objective.create("cache:" + objective.name);
        if (!GlobalScoreBoardCache.varMap.has(objective.name)) {
            GlobalScoreBoardCache.varMap.set(objective.name, new Map());
        }
        this.scores = this.entity.getScoresManager();
        this.useMap = GlobalScoreBoardCache.varMap.get(objective.name) as Map<string, number>;
    }
    debug() {
        this.objective.setDisplay();
    }

    private static varMap = new Map<string, Map<string, number>>();
    public setBoolean(name: string, value: boolean) {
        this.setNumber(name, value ? 1 : 0);
    }
    public getBoolean(name: string) {
        return this.getNumber(name) === 1;
    }

    public setNumber(name: string, value: number): void {
        this.entity.nameTag = name;
        this.scores.setScore(this.objective, value);
        this.useMap.set(name, value);
    }
    public getNumber(name: string) {
        this.entity.nameTag = name;
        if (!this.useCache) return this.scores.getScore(this.objective)
        if (!this.useMap.has(name)) {
            this.useMap.set(name, this.scores.getScore(this.objective));
        }
        return this.useMap.get(name);
    }
    public deleteNumber(name: string) {
        this.entity.nameTag = name;
        this.useMap.delete(name);
        return this.scores.deleteScore(this.objective);
    }
    public has(name:string){
        this.entity.nameTag = name;
        return this.scores.hasScore(this.objective);
    }
    public initializeNumber(name: string,value: number) {
        //这是lly写的，用来初始化计分板上某一项的值。若未初始化返回true，初始化了返回false
        if (!this.has(name)){
            this.setNumber(name,value)
            return true
        } else {
            return false
        }
    }
    public initializeBoolean(name: string,value: boolean) {
        return this.initializeNumber(name,value ? 1 : 0);
    }
}