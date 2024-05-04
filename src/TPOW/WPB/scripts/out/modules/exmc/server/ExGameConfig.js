var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { world, MinecraftDimensionTypes } from '@minecraft/server';
export default class ExGameConfig {
    static runCommandAsync(str) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return world.getDimension(MinecraftDimensionTypes.overworld).runCommandAsync(str);
            }
            catch (e) {
                console.warn("Console error:", e);
            }
        });
    }
}
//# sourceMappingURL=ExGameConfig.js.map