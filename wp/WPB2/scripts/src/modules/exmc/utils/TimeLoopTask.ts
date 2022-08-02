import SetTimeOutSupport from "../interface/SetTimeOutSupport.js";

export default class TimeLoopTask {
    setTimeout: (fun: () => void, timeout: number) => void;
    looper: () => void;
    time: number = 1000;
    isStopped!: boolean;
    constructor(timeOut: SetTimeOutSupport, looper: () => void) {
        this.setTimeout = timeOut.setTimeout.bind(timeOut);
        this.looper = looper;
    }
    delay(time: number) {
        this.time = time;
        return this;
    }
    startOnce(){
        this.isStopped = false;
        let func = () => {
            if (!this.isStopped) {
                this.looper();
            }
        }
        this.setTimeout(func, this.time);
    }
    start() {
        this.isStopped = false;
        let func = () => {
            if (!this.isStopped) {
                this.looper();
                this.setTimeout(func, this.time);
            }
        }
        this.setTimeout(func, this.time);
    }

    stop() {
        this.isStopped = true;
    }
}