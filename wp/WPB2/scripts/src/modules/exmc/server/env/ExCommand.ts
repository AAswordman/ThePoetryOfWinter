
import { CommandResult, Entity } from '@minecraft/server';
import ExEntity from '../entity/ExEntity.js';
import format from '../../utils/format.js';
import UUID from '../../utils/UUID.js';
import { ExCommandRunner, ExCommandNativeRunner } from '../../interface/ExCommandRunner.js';
import ExGameServer from '../ExGameServer.js';
import TickDelayTask from '../../utils/TickDelayTask.js';
import ExErrorQueue from '../ExErrorQueue.js';
import Queue from '../../utils/Queue.js';
import ExSystem from '../../utils/ExSystem.js';
export default class ExCommand {
    runner: ExCommandNativeRunner;
    static delay: TickDelayTask;
    static queue: Queue<(undefined | [ExCommandNativeRunner, string, ((Entity | ExEntity)[]), (e: CommandResult) => void, (e: any) => void])>;
    constructor(runner: ExCommandNativeRunner) {
        this.runner = runner;
    }

    run(str: string, ...entities: (Entity | ExEntity)[]): Promise<CommandResult> {
        const p = new Promise<CommandResult>((resolve, reject) => {
            ExCommand.queue.push([this.runner, str, entities, resolve, reject]);
        });

        //console.warn("id:" + ExSystem.getId(ExCommand.queue));
        return p;
    }

    public static init(server: ExGameServer) {
        this.queue = new Queue();
        this.delay = new TickDelayTask(server.getEvents(), () => {
            
            let i = 0;
            while (ExCommand.queue.length > 0 && i < 100) {
                const a = ExCommand.queue.shift();
                i++;
                if (a === undefined) continue;
                ExCommand.run(a[0], a[1], ...a[2]).then(e => {
                    a[3](e);
                }).catch(e => {
                    a[4](e);
                });
            }
        }).delay(1);
        this.delay.start();
    }

    public static async run(runner: ExCommandNativeRunner, cmd: string, ...entities: (Entity | ExEntity)[]) {
        const arr: [Entity, string][] = [];
        let p: CommandResult = await runner.runCommandAsync(
            entities.length === 0 ? cmd : (format(cmd, entities.map(e => {
                let uuid = UUID.randomUUID();
                if (e instanceof ExEntity) {
                    e = e.entity;
                }
                e.addTag(uuid);
                arr.push([e, uuid]);
                return `@e[tag="${uuid}"]`;
            })))
        );

        for (let e of arr) {
            e[0].removeTag(e[1]);
        }
        return p;
    }
}