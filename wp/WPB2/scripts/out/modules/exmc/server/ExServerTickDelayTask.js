import ExGame from "./ExGame.js";
export default class ExServerTickDelayTask {
    getDelay() {
        return this.time;
    }
    constructor(looper) {
        this.time = 20;
        this.looper = looper;
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
        this.id = ExGame.runTimeout(this.func, this.time);
    }
    start() {
        if (this.isStarted())
            return;
        this.func = () => {
            this.looper();
        };
        this.id = ExGame.runInterval(this.func, this.time);
    }
    stop() {
        if (!this.func)
            return;
        if (!this.id)
            throw new Error("error id is required");
        ExGame.clearRun(this.id);
        this.func = undefined;
    }
}
//# sourceMappingURL=ExServerTickDelayTask.js.map