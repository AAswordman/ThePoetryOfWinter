var _a;
import Vector3 from "../../../../modules/exmc/math/Vector3.js";
export default class RuinsLoaction {
}
_a = RuinsLoaction;
RuinsLoaction.DESERT_RUIN_NUM = 0;
RuinsLoaction.DESERT_RUIN_LOCATION_START = new Vector3(16384, 64, 16384);
RuinsLoaction.DESERT_RUIN_LOCATION_SIZE = new Vector3(512, 191, 512);
RuinsLoaction.DESERT_RUIN_LOCATION_END = _a.DESERT_RUIN_LOCATION_START.clone().add(_a.DESERT_RUIN_LOCATION_SIZE);
RuinsLoaction.DESERT_RUIN_LOCATION_CENTER = _a.DESERT_RUIN_LOCATION_START.clone().add(_a.DESERT_RUIN_LOCATION_SIZE.x / 2, 0, _a.DESERT_RUIN_LOCATION_SIZE.z / 2);
//# sourceMappingURL=RuinsLoaction.js.map