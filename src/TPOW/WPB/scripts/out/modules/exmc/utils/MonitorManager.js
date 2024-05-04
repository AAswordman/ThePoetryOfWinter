import ExErrorQueue from "../server/ExErrorQueue.js";
export default class MonitorManager {
    constructor() {
        this.mixer = [];
    }
    addMonitor(monitor) {
        this.mixer.push(monitor);
        return monitor;
    }
    removeMonitor(monitor) {
        let index = this.mixer.indexOf(monitor);
        if (index === -1)
            return;
        this.mixer.splice(index, 1);
    }
    hasMonitor(monitor) {
        let index = this.mixer.indexOf(monitor);
        return index !== -1;
    }
    trigger(...args) {
        for (let e of this.mixer) {
            try {
                e(...args);
            }
            catch (err) {
                ExErrorQueue.throwError(err);
            }
        }
    }
    get length() {
        return this.mixer.length;
    }
    *[Symbol.iterator]() {
        for (let e of this.mixer) {
            yield e;
        }
    }
    forEach(arg0) {
        for (let e of this.mixer) {
            try {
                arg0(e);
            }
            catch (err) {
                ExErrorQueue.throwError(err);
            }
        }
    }
}
//# sourceMappingURL=MonitorManager.js.map