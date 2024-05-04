import Random from "./Random.js";
export default class TimeLoopTask {
    getDelay() {
        return this.targetDelay;
    }
    constructor(timeOut, looper) {
        this.targetDelay = 1000;
        this.times = 0;
        this.timeOut = timeOut;
        this.looper = looper;
    }
    delay(time) {
        this.targetDelay = time;
        return this;
    }
    isStarted() {
        return this.func !== undefined;
    }
    startOnce() {
        if (this.isStarted())
            return;
        this.times = 0;
        this.func = (e) => {
            this.times += e.deltaTime * 1000;
            if (this.times >= this.targetDelay) {
                this.stop();
                this.looper();
            }
        };
        this.timeOut.register("tick", this.func);
    }
    start() {
        if (this.isStarted())
            return;
        this.times = 0;
        this.func = (e) => {
            this.times += e.deltaTime * 1000;
            if (this.times >= this.targetDelay) {
                this.looper();
                this.times = 0;
            }
        };
        this.timeOut.register("tick", this.func);
    }
    trigger() {
        if (this.isStarted())
            this.times = Random.MAX_VALUE;
    }
    stop() {
        if (!this.func)
            return;
        this.timeOut.cancel("tick", this.func);
        this.func = undefined;
    }
}
//# sourceMappingURL=TimeLoopTask.js.map