import ExErrorQueue from "../server/ExErrorQueue.js";

export default class MonitorManager<T extends Array<any>, R = void> {
    mixer: ((...args: T) => R)[];
    constructor() {
        this.mixer = [];
    }
    addMonitor(monitor: (...args: T) => R) {
        this.mixer.push(monitor);
        return monitor;
    }
    removeMonitor(monitor: (...args: T) => R) {
        let index = this.mixer.indexOf(monitor);
        if (index === -1) return;
        this.mixer.splice(index, 1);
    }
    hasMonitor(monitor: (...args: T) => R) {
        let index = this.mixer.indexOf(monitor);
        return index !== -1;
    }
    
    
    trigger(...args: T) {
        for (let e of this.mixer) {
            try {
                e(...args);
            } catch (err) {
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
    forEach(arg0: (f: ((...args: T) => R)) => void) {
        for (let e of this.mixer) {
            try {
                arg0(e);
            } catch (err) {
                ExErrorQueue.throwError(err);
            }
        }
    }
}