import { IVector3 } from "../../../modules/exmc/math/Vector3.js";
import { ExBlockArea } from "../../../modules/exmc/server/block/ExBlockArea.js";

export default interface BlockPartitioningCache<T> {
    [x: string]: [IVector3,IVector3,T][]
}