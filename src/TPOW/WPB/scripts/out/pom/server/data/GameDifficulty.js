export class PomGameFoolDifficulty {
    constructor() {
        this.name = "BIG Fool";
        this.id = "1";
        this.healthAddionion = 30;
        this.physicalDefenseAddFactor = 0.4;
        this.magicDefenseAddFactor = 0.3;
        this.damageAddFactor = 1.7;
        this.wbflAddFactor = 2.2;
        this.coolingFactor = 1.8;
        this.LevelFactor = 8;
    }
}
export class PomGameEasyDifficulty {
    constructor() {
        this.name = "Easy";
        this.id = "2";
        this.healthAddionion = 10;
        this.physicalDefenseAddFactor = 0.2;
        this.magicDefenseAddFactor = 0.1;
        this.damageAddFactor = 1.3;
        this.wbflAddFactor = 1.5;
        this.coolingFactor = 1.3;
        this.LevelFactor = 4;
    }
}
export class PomGameNormalDifficulty {
    constructor() {
        this.name = "Normal(original)";
        this.id = "3";
        this.healthAddionion = 0;
        this.physicalDefenseAddFactor = 0;
        this.magicDefenseAddFactor = 0;
        this.damageAddFactor = 1;
        this.wbflAddFactor = 1;
        this.coolingFactor = 1;
        this.LevelFactor = 2;
    }
}
export class PomGameHardDifficulty {
    constructor() {
        this.name = "Difficult";
        this.id = "4";
        this.healthAddionion = -10;
        this.physicalDefenseAddFactor = 0;
        this.magicDefenseAddFactor = 0;
        this.damageAddFactor = 0.8;
        this.wbflAddFactor = 0.8;
        this.coolingFactor = 0.8;
        this.LevelFactor = 1.5;
    }
}
export class PomGameHellDifficulty {
    constructor() {
        this.name = "Human play???";
        this.id = "5";
        this.healthAddionion = -15;
        this.physicalDefenseAddFactor = -0.2;
        this.magicDefenseAddFactor = -0.2;
        this.damageAddFactor = 0.5;
        this.wbflAddFactor = 0.6;
        this.coolingFactor = 0.6;
        this.LevelFactor = 1;
    }
}
const _pomDifficultyMap = new Map();
_pomDifficultyMap.set("1", new PomGameFoolDifficulty());
_pomDifficultyMap.set("2", new PomGameEasyDifficulty());
_pomDifficultyMap.set("3", new PomGameNormalDifficulty());
_pomDifficultyMap.set("4", new PomGameHardDifficulty());
_pomDifficultyMap.set("5", new PomGameHellDifficulty());
export const pomDifficultyMap = _pomDifficultyMap;
//# sourceMappingURL=GameDifficulty.js.map