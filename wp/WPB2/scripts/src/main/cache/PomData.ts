import { serialize, SerializeAble } from "../../modules/exmc/utils/Serialize.js";
import Vector3 from "../../modules/exmc/utils/Vector3.js";
import TalentData from "./TalentData.js";

export default class PomData implements SerializeAble {
    isSerializeAble: true = true;
    
    talent: TalentData = new TalentData();

    pointRecord = {
        deathPoint: <[string,Vector3][]>[],
        point: <[string,string,Vector3][]>[]
    };
}