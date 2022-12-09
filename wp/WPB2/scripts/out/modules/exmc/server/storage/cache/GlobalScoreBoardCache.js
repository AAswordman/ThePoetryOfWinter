import ExNullEntity from '../../entity/ExNullEntity.js';
export default class GlobalScoreBoardCache {
    constructor(objective) {
        this.entity = new ExNullEntity("");
        this.objective = objective;
        objective.create("cache:" + objective.name);
        if (!GlobalScoreBoardCache.varMap.has(objective.name)) {
            GlobalScoreBoardCache.varMap.set(objective.name, new Map());
        }
        this.useMap = GlobalScoreBoardCache.varMap.get(objective.name);
    }
    debug() {
        this.objective.setDisplay();
    }
    setBoolean(name, value) {
        this.setNumber(name, value ? 1 : 0);
    }
    getBoolean(name) {
        return this.getNumber(name) === 1;
    }
    setNumber(name, value) {
        this.entity.nameTag = name;
        this.entity.getScoresManager().setScoreAsync(this.objective, value);
        this.useMap.set(name, value);
    }
    getNumber(name) {
        this.entity.nameTag = name;
        return this.useMap.get(name);
    }
    deleteNumber(name) {
        this.entity.nameTag = name;
        this.useMap.delete(name);
        return this.entity.getScoresManager().deleteScoreAsync(this.objective);
    }
}
GlobalScoreBoardCache.varMap = new Map();
//# sourceMappingURL=GlobalScoreBoardCache.js.map