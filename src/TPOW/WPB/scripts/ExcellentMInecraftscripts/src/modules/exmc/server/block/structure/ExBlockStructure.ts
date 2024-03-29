import { ExBlockArea } from '../ExBlockArea.js';
import { Dimension } from '@minecraft/server';
export default interface ExBlockStructure {
    find(): ExBlockArea | undefined;
    setStructure(res: string[][]): this;
    analysis(map: object | Map<string, string>): this;
    putStructure(area: ExBlockArea): this;
    setArea(area: ExBlockArea): this;
    setDimension(dim: Dimension): this;
    setDirection(dic: number): this;
    clone():ExBlockStructure;
}