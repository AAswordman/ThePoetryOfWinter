export default class MonitorMixer {
    constructor(paraLength) {
        this.mixer = new Array();
        this.paraLength = paraLength;
    }
    addMonitor(monitor) {
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