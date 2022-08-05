import { Events, TickEvent } from 'mojang-minecraft';
import ExEventManager from "../interface/ExEventManager.js";
import SetTimeOutSupport from "../interface/SetTimeOutSupport.js";

export default class TimeLoopTask {
    timeOut: ExEventManager;
    func ?: (e: TickEvent) => void;
    getDelay() {
        return this.time;
    }

    looper: () => void;
    time: number = 1000;
    constructor(timeOut: ExEventManager, looper: () => void) {
        this.timeOut = timeOut;
        this.looper = looper;
    }
    delay(time: number) {
        this.time = time;
        return this;
    }
    isStarted(): boolean {
        return this.func !== undefined;
    }
    startOnce() {
        let times = 0;
        if(this.isStarted()) return;
        this.func = (e: TickEvent) => {
            times += e.deltaTime*1000;
            if (times >= this.time) {
                this.looper();
                this.stop();
            }
        }
        this.timeOut.register("tick", this.func);
    }
    start() {
        let times = 0;
        if(this.isStarted()) return;
        this.func = (e: TickEvent) => {
            times += e.deltaTime*1000;
            if (times >= this.time) {
                this.looper();
                times = 0;
            }
        }
        this.timeOut.register("tick", this.func);
    }

    stop() {
        if(!this.func) return;
        this.timeOut.cancel("tick", this.func);
        this.func = undefined;
    }
}