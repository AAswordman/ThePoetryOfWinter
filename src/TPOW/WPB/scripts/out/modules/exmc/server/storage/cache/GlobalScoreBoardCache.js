import ExNullEntity from '../../entity/ExNullEntity.js';
class GlobalScoreBoardCache {
    constructor(objective, useCache = true) {
        this.useCache = useCache;
        this.entity = new ExNullEntity("");
        this.objective = objective;
        objective.create("cache:" + objective.name);
        if (!GlobalScoreBoardCache.varMap.has(objective.name)) {
            GlobalScoreBoardCache.varMap.set(objective.name, new Map());
        }
        this.scores = this.entity.getScoresManager();
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
        this.scores.setScore(this.objective, value);
        this.useMap.set(name, value);
    }
    getNumber(name) {
        this.entity.nameTag = name;
        if (!this.useCache)
            return this.scores.getScore(this.objective);
        if (!this.useMap.has(name)) {
            this.useMap.set(name, this.scores.getScore(this.objective));
        }
        return this.useMap.get(name);
    }
    deleteNumber(name) {
        this.entity.nameTag = name;
        this.useMap.delete(name);
        return this.scores.deleteScore(this.objective);
    }
    has(name) {
        this.entity.nameTag = name;
        return this.scores.hasScore(this.objective);
    }
    initializeNumber(name, value) {
        //这是lly写的，用来初始化计分板上某一项的值。若未初始化返回true，初始化了返回false
        if (!this.has(name)) {
            this.setNumber(name, value);
            return true;
        }
        else {
            return false;
        }
    }
    initializeBoolean(name, value) {
        return this.initializeNumber(name, value ? 1 : 0);
    }
}
GlobalScoreBoardCache.varMap = new Map();
export default GlobalScoreBoardCache;
//# sourceMappingURL=GlobalScoreBoardCache.js.map