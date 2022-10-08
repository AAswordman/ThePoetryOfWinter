import ExInterworkingPool from "../modules/exmc/interface/ExInterworkingPool.js";
import { basicFinalType } from '../modules/exmc/interface/types.js';

export default class PomTransmission implements ExInterworkingPool{
    [variableName: string]: basicFinalType | ((...args: basicFinalType[]) => (Promise<basicFinalType | void>));
    async setSkyBox(){
        
    }
}