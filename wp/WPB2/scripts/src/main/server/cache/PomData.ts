import { serialize } from "../../../modules/exmc/utils/Serialize.js";
import Vector3 from "../../../modules/exmc/math/Vector3.js";
import TalentData from "./TalentData.js";

export default class PomData {

    talent: TalentData = new TalentData();

    pointRecord = {
        deathPoint: <[string, Vector3][]>[],
        point: <[string, string, Vector3][]>[]
    };

    dimBackPoint: Vector3 | undefined;

    lang?: "en" | "zh";

}