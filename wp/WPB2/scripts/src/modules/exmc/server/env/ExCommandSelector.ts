import ExCommandRunner from '../../interface/ExCommandRunner.js';
import { Entity } from '@minecraft/server';
import ExEntity from '../entity/ExEntity.js';
import format from '../../utils/format.js';
import UUID from '../../utils/UUID.js';
export default class ExCommandSelector {
    public static run(runner: ExCommandRunner, cmd: string, ...entities: (Entity | ExEntity)[]) {
        const arr:[Entity,string][] = [];
        let p = runner.runCommand(
            format(cmd, entities.map(e => {
                let uuid = UUID.randomUUID();
                if(e instanceof ExEntity){
                    e = e.entity;
                }
                e.addTag(uuid);
                arr.push([e,uuid]);
                return `@e[tag="${uuid}"]`;
            })));
        for(let e of arr){
            e[0].removeTag(e[1]);
        }
        return p;
    }
    public static async runAsync(runner: ExCommandRunner, cmd: string, ...entities: (Entity | ExEntity)[]) {
        const arr:[Entity,string][] = [];
        let p = await runner.runCommandAsync(
            format(cmd, entities.map(e => {
                let uuid = UUID.randomUUID();
                if(e instanceof ExEntity){
                    e = e.entity;
                }
                e.addTag(uuid);
                arr.push([e,uuid]);
                return `@e[tag="${uuid}"]`;
            })));
        for(let e of arr){
            e[0].removeTag(e[1]);
        }
        return p;
    }
}