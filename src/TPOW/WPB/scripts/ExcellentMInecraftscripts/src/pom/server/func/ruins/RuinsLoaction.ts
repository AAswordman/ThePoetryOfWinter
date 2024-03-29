import Vector3, { IVector3 } from "../../../../modules/exmc/math/Vector3.js";
import { ExBlockArea } from '../../../../modules/exmc/server/block/ExBlockArea.js';

export default class RuinsLoaction {
    public static readonly DESERT_RUIN_NUM = 0;
    public static readonly DESERT_RUIN_LOCATION_START = new Vector3(16384, 64, 16384);
    public static readonly DESERT_RUIN_LOCATION_SIZE = new Vector3(512, 191, 512);
    public static readonly DESERT_RUIN_LOCATION_END = this.DESERT_RUIN_LOCATION_START.cpy().add(this.DESERT_RUIN_LOCATION_SIZE);
    public static readonly DESERT_RUIN_LOCATION_CENTER = this.DESERT_RUIN_LOCATION_START.cpy().add(this.DESERT_RUIN_LOCATION_SIZE.x / 2, 0, this.DESERT_RUIN_LOCATION_SIZE.z / 2);
    public static readonly DESERT_RUIN_AREA = new ExBlockArea(this.DESERT_RUIN_LOCATION_START, this.DESERT_RUIN_LOCATION_SIZE);
    public static readonly DESERT_RUIN_PROTECT_AREA = new ExBlockArea(
        this.DESERT_RUIN_LOCATION_START.cpy().sub(this.DESERT_RUIN_LOCATION_SIZE),
        this.DESERT_RUIN_LOCATION_END.cpy().add(this.DESERT_RUIN_LOCATION_SIZE));

    public static readonly STONE_RUIN_NUM = 1;
    public static readonly STONE_RUIN_LOCATION_START = new Vector3(15360, 64, 15360);
    public static readonly STONE_RUIN_LOCATION_SIZE = new Vector3(128, 128, 128);
    public static readonly STONE_RUIN_LOCATION_END = this.STONE_RUIN_LOCATION_START.cpy().add(this.STONE_RUIN_LOCATION_SIZE);
    public static readonly STONE_RUIN_LOCATION_CENTER = this.STONE_RUIN_LOCATION_START.cpy().add(this.STONE_RUIN_LOCATION_SIZE.x / 2, 0, this.STONE_RUIN_LOCATION_SIZE.z / 2);
    public static readonly STONE_RUIN_AREA = new ExBlockArea(this.STONE_RUIN_LOCATION_START, this.STONE_RUIN_LOCATION_SIZE);
    public static readonly STONE_RUIN_PROTECT_AREA = new ExBlockArea(
        this.STONE_RUIN_LOCATION_START.cpy().sub(this.STONE_RUIN_LOCATION_SIZE),
        this.STONE_RUIN_LOCATION_END.cpy().add(this.STONE_RUIN_LOCATION_SIZE));

    public static readonly CAVE_RUIN_NUM = 2;
    public static readonly CAVE_RUIN_LOCATION_START = new Vector3(17408, 64, 17408);
    public static readonly CAVE_RUIN_LOCATION_SIZE = new Vector3(128, 128, 128);
    public static readonly CAVE_RUIN_LOCATION_END = this.CAVE_RUIN_LOCATION_START.cpy().add(this.CAVE_RUIN_LOCATION_SIZE);
    public static readonly CAVE_RUIN_LOCATION_CENTER = this.CAVE_RUIN_LOCATION_START.cpy().add(this.CAVE_RUIN_LOCATION_SIZE.x / 2, 0, this.CAVE_RUIN_LOCATION_SIZE.z / 2);
    public static readonly CAVE_RUIN_AREA = new ExBlockArea(this.CAVE_RUIN_LOCATION_START, this.CAVE_RUIN_LOCATION_SIZE);
    public static readonly CAVE_RUIN_PROTECT_AREA = new ExBlockArea(
        this.CAVE_RUIN_LOCATION_START.cpy().sub(this.CAVE_RUIN_LOCATION_SIZE),
        this.CAVE_RUIN_LOCATION_END.cpy().add(this.CAVE_RUIN_LOCATION_SIZE));

    public static readonly ANCIENT_RUIN_NUM = 3;
    public static readonly ANCIENT_RUIN_LOCATION_START = new Vector3(15360, 64, 16384);
    public static readonly ANCIENT_RUIN_LOCATION_SIZE = new Vector3(128, 128, 128);
    public static readonly ANCIENT_RUIN_LOCATION_END = this.ANCIENT_RUIN_LOCATION_START.cpy().add(this.ANCIENT_RUIN_LOCATION_SIZE);
    public static readonly ANCIENT_RUIN_LOCATION_CENTER = this.ANCIENT_RUIN_LOCATION_START.cpy().add(this.ANCIENT_RUIN_LOCATION_SIZE.x / 2, 0, this.ANCIENT_RUIN_LOCATION_SIZE.z / 2);
    public static readonly ANCIENT_RUIN_AREA = new ExBlockArea(this.ANCIENT_RUIN_LOCATION_START, this.ANCIENT_RUIN_LOCATION_SIZE);
    public static readonly ANCIENT_RUIN_PROTECT_AREA = new ExBlockArea(
        this.ANCIENT_RUIN_LOCATION_START.cpy().sub(this.ANCIENT_RUIN_LOCATION_SIZE),
        this.ANCIENT_RUIN_LOCATION_END.cpy().add(this.ANCIENT_RUIN_LOCATION_SIZE));

    public static readonly MIND_RUIN_NUM = 4;
    public static readonly MIND_RUIN_LOCATION_START = new Vector3(15360, 64, 17408);
    public static readonly MIND_RUIN_LOCATION_SIZE = new Vector3(128, 128, 128);
    public static readonly MIND_RUIN_LOCATION_END = this.MIND_RUIN_LOCATION_START.cpy().add(this.MIND_RUIN_LOCATION_SIZE);
    public static readonly MIND_RUIN_LOCATION_CENTER = this.MIND_RUIN_LOCATION_START.cpy().add(this.MIND_RUIN_LOCATION_SIZE.x / 2, 0, this.MIND_RUIN_LOCATION_SIZE.z / 2);
    public static readonly MIND_RUIN_AREA = new ExBlockArea(this.MIND_RUIN_LOCATION_START, this.MIND_RUIN_LOCATION_SIZE);
    public static readonly MIND_RUIN_PROTECT_AREA = new ExBlockArea(
        this.MIND_RUIN_LOCATION_START.cpy().sub(this.MIND_RUIN_LOCATION_SIZE),
        this.MIND_RUIN_LOCATION_END.cpy().add(this.MIND_RUIN_LOCATION_SIZE));
    public static isInProtectArea(v: IVector3) {
        return RuinsLoaction.DESERT_RUIN_PROTECT_AREA.contains(v)
            || RuinsLoaction.STONE_RUIN_PROTECT_AREA.contains(v)
            || RuinsLoaction.CAVE_RUIN_PROTECT_AREA.contains(v)
            || RuinsLoaction.ANCIENT_RUIN_PROTECT_AREA.contains(v)
            || RuinsLoaction.MIND_RUIN_PROTECT_AREA.contains(v);
    }
}