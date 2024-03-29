import { IVector3 } from "../../../modules/exmc/math/Vector3.js";
import TerritoryData from "../data/TerritoryData.js";
import BlockPartitioningCache from "./BlockPartitioningCache.js";

export default class PomServerData {
    territoryData!: BlockPartitioningCache<TerritoryData>;
    socialListGlobalMap!: {
        [id: number]: {
            refuseList: number[];
            acceptList: number[];
        }
    };
    redemptionCode!: {
        [id: string]: string
    };

}