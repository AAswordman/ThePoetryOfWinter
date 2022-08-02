import { SerializeAble } from "../../modules/exmc/utils/Serialize.js";
import TalentData from "./TalentData.js";

export default class PomData implements SerializeAble{
    isSerializeAble: true = true;
    talent: TalentData = new TalentData();
}