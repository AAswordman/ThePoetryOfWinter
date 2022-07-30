export default class MonitorMixer {
    constructor(paraLength) {
        this.mixer = new Array();
        this.paraLength = paraLength;
    }
    addMonitor(monitor) {
        if (!(typeof monitor === "function")) {
            throw new Error("Monitor isn't a function");
        }
        if (this.paraLength != monitor.length) {
            throw new Error("Wrong parameter length");
        }
        this.mixer.push(monitor);
    }
    getMix() {
        const mixer = this.mixer;
        return function () {
            for (let m in mixer) {
                mixer[m].apply(null, arguments);
            }
        };
    }
}
//# sourceMappingURL=MonitorMixer.js.map