export default class TickDelayTask {
    constructor(timeOut, looper) {
        this.time = 20;
        this.timeOut = timeOut;
        this.looper = looper;
    }
    getDelay() {
        return this.time;
    }
    delay(time) {
        this.time = time;
        return this;
    }
    isStarted() {
        return this.func !== undefined;
    }
    startOnce() {
        let times = 0;
        if (this.isStarted())
            return;
        this.func = (e) => {
            times += 1;
            if (times >= this.time) {
                this.looper();
                this.stop();
            }
        };
        this.timeOut.register("tick", this.func);
    }
    start() {
        let times = 0;
        if (this.isStarted())
            return;
        this.func = (e) => {
            times += 1;
            if (times >= this.time) {
                this.looper();
                times = 0;
            }
        };
        this.timeOut.register("tick", this.func);
    }
    stop() {
        if (!this.func)
            return;
        this.timeOut.cancel("tick", this.func);
        this.func = undefined;
    }
}
//# sourceMappingURL=TickDelayTask.js.map