export default class MonitorMixer {
    mixer: any[];
    paraLength: any;
    constructor(paraLength: any) {
        this.mixer = new Array();
        this.paraLength = paraLength;
    }
    addMonitor(monitor: any) {
        if (this.paraLength != monitor.length) {
            throw new Error("Wrong parameter length");
        }
        this.mixer.push(monitor);
    }

    getMix() {
        const mixer = this.mixer;
        return function() {
            for (let m in mixer) {
                mixer[m].apply(null, arguments);
            }
        }
    }
}