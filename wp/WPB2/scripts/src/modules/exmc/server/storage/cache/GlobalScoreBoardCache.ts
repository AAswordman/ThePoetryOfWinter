import { Objective } from "../../entity/ExScoresManager.js";
import ExNullEntity from '../../entity/ExNullEntity.js';

export default class GlobalScoreBoardCache {
    objective: Objective;
    entity = new ExNullEntity("");
    useMap: Map<string, number>;
    constructor(objective: Objective) {
        this.objective = objective;
        objective.create("cache:" + objective.name);
        if(!GlobalScoreBoardCache.varMap.has(objective.name)){
            GlobalScoreBoardCache.varMap.set(objective.name,new Map());
        }
        this.useMap = GlobalScoreBoardCache.varMap.get(objective.name) as Map<string,number>;
    }
    debug() {
        this.objective.setDisplay();
    }

    private static varMap = new Map<string,Map<string,number>>();
    public setBoolean(name:string, value:boolean) {
        this.setNumber(name, value?1:0);
    }
    public getBoolean(name:string) {
        return this.getNumber(name) === 1;
    }

    public setNumber(name: string, value: number): void {
        this.entity.nameTag = name;
        this.entity.getScoresManager().setScoreAsync(this.objective, value);
        this.useMap.set(name, value);
    }
    public getNumber(name: string) {
        this.entity.nameTag = name;
        return this.useMap.get(name);
    }
    public deleteNumber(name: string) {
        this.entity.nameTag = name;
        this.useMap.delete(name);
        return this.entity.getScoresManager().deleteScoreAsync(this.objective);
    }
}