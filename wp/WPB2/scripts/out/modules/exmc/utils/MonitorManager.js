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
            e(...args);
        }
    }
}
//# sourceMappingURL=MonitorManager.js.map