import { basicFinalType } from './types.js';

export default interface ExInterworkingPool {
    [variableName: string]: basicFinalType | ((...args: basicFinalType[]) => (Promise<basicFinalType | void>));
}