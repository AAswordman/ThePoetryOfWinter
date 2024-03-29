import { Dimension, Block } from '@minecraft/server';
import DisposeAble from "../../../../modules/exmc/interface/DisposeAble.js";
import { ExBlockArea } from '../../../../modules/exmc/server/block/ExBlockArea.js';

export default interface PomRuinCommon extends DisposeAble {
    init(x: number, y: number, z: number, dim: Dimension): void;
    generate(): void;

    getPathArea():  ExBlockArea[];
    getMonsterSpawnArea():  ExBlockArea[];
    getPlayerSpawnArea():  ExBlockArea[];
    getBossSpawnArea():  ExBlockArea|undefined;

}