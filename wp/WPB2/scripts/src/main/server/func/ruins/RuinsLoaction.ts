import Vector3 from "../../../../modules/exmc/math/Vector3.js";

export default class RuinsLoaction {
    public static readonly DESERT_RUIN_NUM = 0;
    public static readonly DESERT_RUIN_LOCATION_START = new Vector3(16384, 64, 16384);
    public static readonly DESERT_RUIN_LOCATION_SIZE = new Vector3(512, 191, 512);
    public static readonly DESERT_RUIN_LOCATION_END = this.DESERT_RUIN_LOCATION_START.clone().add(this.DESERT_RUIN_LOCATION_SIZE);
    public static readonly DESERT_RUIN_LOCATION_CENTER = this.DESERT_RUIN_LOCATION_START.clone().add(this.DESERT_RUIN_LOCATION_SIZE.x / 2, 0, this.DESERT_RUIN_LOCATION_SIZE.z / 2);

}