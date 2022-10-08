import { ExBlockArea } from '../ExBlockArea.js';
import { Dimension } from 'mojang-minecraft';
export default interface ExBlockStructure {
    find(): ExBlockArea | undefined;
    setStructure(res: string[][]): ExBlockStructure;
    analysis(map: object | Map<string, string>): ExBlockStructure;
    putStructure(area: ExBlockArea): ExBlockStructure;
    setArea(area: ExBlockArea): ExBlockStructure;
    setDimension(dim: Dimension): ExBlockStructure;
    setDirection(dic: number): ExBlockStructure;
}