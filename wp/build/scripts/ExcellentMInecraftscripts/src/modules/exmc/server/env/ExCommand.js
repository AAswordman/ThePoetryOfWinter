import ExEntity from '../entity/ExEntity.js';
import format from '../../utils/format.js';
import UUID from '../../utils/UUID.js';
import Queue from '../../utils/Queue.js';
import ExSystem from '../../utils/ExSystem.js';
export default class ExCommand {
    constructor(runner) {
        this.runner = runner;
    }
    run(str, ...entities) {
        if (typeof str === "string") {
            const p = new Promise((resolve, reject) => {
                ExCommand.queue.push([this.runner, str, entities, resolve, reject]);
            });
            return p;
        }
        else {
            let arr = [];
            for (let i of str) {
                this.run(i, ...entities);
            }
            return arr;
        }
    }
    static init(server) {
        this.queue = new Queue();
        this.delay = ExSystem.tickTask(() => {
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
    static async run(runner, cmd, ...entities) {
        const arr = [];
        let p = await runner.runCommandAsync(entities.length === 0 ? cmd : (format(cmd, entities.map(e => {
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
    }
}
