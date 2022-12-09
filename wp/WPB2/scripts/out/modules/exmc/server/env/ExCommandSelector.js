var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ExEntity from '../entity/ExEntity.js';
import format from '../../utils/format.js';
import UUID from '../../utils/UUID.js';
export default class ExCommand {
    static run(runner, cmd, ...entities) {
        const arr = [];
        let p = runner.runCommand(format(cmd, entities.map(e => {
            let uuid = UUID.randomUUID();
            if (e instanceof ExEntity) {
                e = e.entity;
            }
            e.addTag(uuid);
            arr.push([e, uuid]);
            return `@e[tag="${uuid}"]`;
        })));
        for (let e of arr) {
            e[0].removeTag(e[1]);
        }
        return p;
    }
    static runAsync(runner, cmd, ...entities) {
        return __awaiter(this, void 0, void 0, function* () {
            const arr = [];
            let p = yield runner.runCommandAsync(format(cmd, entities.map(e => {
                let uuid = UUID.randomUUID();
                if (e instanceof ExEntity) {
                    e = e.entity;
                }
                e.addTag(uuid);
                arr.push([e, uuid]);
                return `@e[tag="${uuid}"]`;
            })));
            for (let e of arr) {
                e[0].removeTag(e[1]);
            }
            return p;
        });
    }
}
//# sourceMappingURL=ExCommandSelector.js.map