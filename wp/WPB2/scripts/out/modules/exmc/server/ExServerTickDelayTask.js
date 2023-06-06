import { system } from '@minecraft/server';
export default class ExServerTickDelayTask {
    constructor(looper) {
        this.time = 20;
        this.looper = looper;
    }
    getDelay() {
        return this.time;
    }
    delay(time) {
        if (this.isStarted())
            throw new Error('TickDelayTask already started');
        this.time = time;
        return this;
    }
    isStarted() {
        return this.func !== undefined;
    }
    startOnce() {
        if (this.isStarted())
            return;
        this.func = () => {
            this.looper();
        };
        this.id = system.runTimeout(this.func, this.time);
    }
    start() {
        if (this.isStarted())
            return;
        this.func = () => {
            this.looper();
        };
        this.id = system.runInterval(this.func, this.time);
    }
    stop() {
        if (!this.func)
            return;
        if (!this.id)
            throw new Error("error id is required");
        system.clearRun(this.id);
        this.func = undefined;
    }
}
//# sourceMappingURL=ExServerTickDelayTask.js.map