import TalentData from "./TalentData.js";
export default class PomData {
    constructor() {
        this.isSerializeAble = true;
        this.talent = new TalentData();
        this.pointRecord = {
            deathPoint: [],
            point: []
        };
    }
}
//# sourceMappingURL=PomData.js.map