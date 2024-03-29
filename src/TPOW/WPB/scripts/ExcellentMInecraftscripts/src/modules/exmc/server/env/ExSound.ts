import { world, MinecraftDimensionTypes, Dimension } from '@minecraft/server';
import TimeLoopTask from '../../utils/TimeLoopTask.js';
import ExEventManager from '../../interface/ExEventManager.js';
import Vector3, { IVector3 } from '../../math/Vector3.js';
import { to } from '../ExErrorQueue.js';
import ExDimension from '../ExDimension.js';
import ExSystem from '../../utils/ExSystem.js';
import SetTimeOutSupport from '../../interface/SetTimeOutSupport.js';
import ExGameServer from '../ExGameServer.js';
export default class ExSound {
    soundId: string;
    long: number;
    looper?: TimeLoopTask;
    manager: ExGameServer;
    constructor(manager: ExGameServer, id: string, time: string) {
        this.soundId = id;
        let s = time.split(":");
        this.long = (parseInt(s[0]) * 60 + parseInt(s[1])) * 1000;
        this.manager = manager;
    }
    isInDelayStop = false;
    loop(dim: ExDimension, trackVector: IVector3) {
        if (this.isInDelayStop) {
            this.isInDelayStop = false;
        } else {
            this.stop();
            this.play(dim, trackVector);
            this.looper = new TimeLoopTask(this.manager.getEvents(), () => {
                this.play(dim, trackVector);
            }).delay(this.long);
            this.looper.start();
        }
    }
    stop() {
        this.looper?.stop();
        world.getDimension(MinecraftDimensionTypes.overworld).runCommandAsync("stopsound @a " + this.soundId);
    }
    delayStop(time: number) {
        this.isInDelayStop = true;
        this.manager.setTimeout(() => {
            if(this.isInDelayStop){
                this.stop();
            }
            this.isInDelayStop = false;
        }, time);
    }
    play(dim: ExDimension, vec: IVector3) {
        console.warn(`play ${this.soundId} at ${vec.x} ${vec.y} ${vec.z}`)
        to(dim.command.run(`playsound ${this.soundId} @a[r=64,x=${vec.x},y=${vec.y},z=${vec.z}] ${vec.x} ${vec.y} ${vec.z} 0.5 1 0.5`));
    }
}