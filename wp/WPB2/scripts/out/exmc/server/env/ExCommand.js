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
import TickDelayTask from '../../utils/TickDelayTask.js';
import Queue from '../../utils/Queue.js';
export default class ExCommand {
    constructor(runner) {
        this.runner = runner;
    }
    run(str, ...entities) {
        const p = new Promise((resolve, reject) => {
            ExCommand.queue.push([this.runner, str, entities, resolve, reject]);
        });
        return p;
    }
    static init(server) {
        this.queue = new Queue();
        this.delay = new TickDelayTask(server.getEvents(), () => {
            let i = 0;
            while (ExCommand.queue.length > 0 && i < 100) {
                const a = ExCommand.queue.shift();
                i++;
                if (a === undefined)
                    continue;
                ExCommand.run(a[0], a[1], ...a[2]).then(e => {
                    a[3](e);
                }).catch(e => {
                    a[4](e);
                });
            }
        }).delay(1);
        this.delay.start();
    }
    static run(runner, cmd, ...entities) {
        return __awaiter(this, void 0, void 0, function* () {
            const arr = [];
            let p = yield runner.runCommandAsync(entities.length === 0 ? cmd : (format(cmd, entities.map(e => {
                let uuid = UUID.randomUUID();
                if (e instanceof ExEntity) {
                    e = e.entity;
                }
                e.addTag(uuid);
                arr.push([e, uuid]);
                return `@e[tag="${uuid}"]`;
            }))));
            for (let e of arr) {
                e[0].removeTag(e[1]);
            }
            return p;
        });
    }
}
//# sourceMappingURL=ExCommand.js.map